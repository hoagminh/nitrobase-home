import { useLingui } from "@lingui/react";
import { useEffect, useRef } from "react";
import styles from "./DatabaseCanvasBackground.module.css";

interface DatabaseCanvasBackgroundProps {
	isDark: boolean;
}

interface Ripple {
	x: number;
	y: number;
	radius: number;
	maxRadius: number;
	alpha: number;
}

interface CircuitPacket {
	waypoints: { x: number; y: number }[];
	progress: number;
	speed: number;
	color: string;
	size: number;
}

export function DatabaseCanvasBackground({
	isDark,
}: DatabaseCanvasBackgroundProps) {
	const { i18n } = useLingui();
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrameId: number;
		let isDestroyed = false;

		let width = container.clientWidth;
		let height = container.clientHeight;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);

		// Offscreen canvas for high-density background dot matrix
		const bgCanvas = document.createElement("canvas");
		const bgCtx = bgCanvas.getContext("2d");

		const dotPitch = 12;

		const rebuildBackground = () => {
			bgCanvas.width = Math.floor(width * dpr);
			bgCanvas.height = Math.floor(height * dpr);
			if (!bgCtx) return;
			bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
			bgCtx.clearRect(0, 0, width, height);

			const dotColor = isDark
				? "rgba(255, 255, 255, 0.055)"
				: "rgba(24, 24, 27, 0.065)";

			bgCtx.fillStyle = dotColor;
			for (let x = dotPitch / 2; x < width; x += dotPitch) {
				for (let y = dotPitch / 2; y < height; y += dotPitch) {
					bgCtx.beginPath();
					bgCtx.arc(x, y, 0.9, 0, Math.PI * 2);
					bgCtx.fill();
				}
			}
		};

		const handleResize = () => {
			if (!container || !canvas) return;
			width = container.clientWidth;
			height = container.clientHeight;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			rebuildBackground();
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		// Mouse & Interaction
		let mouseX = -1000;
		let mouseY = -1000;
		const ripples: Ripple[] = [];

		const onMouseMove = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		};

		const onMouseLeave = () => {
			mouseX = -1000;
			mouseY = -1000;
		};

		const onClick = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			ripples.push({
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
				radius: 0,
				maxRadius: 280,
				alpha: 1,
			});
		};

		window.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseleave", onMouseLeave);
		canvas.addEventListener("click", onClick);

		// Responsive layout geometry
		const getLayout = (w: number, h: number) => {
			const isDesktop = w > 992;
			// Center database cluster at 32% of screen width on desktop
			const cx = isDesktop ? Math.max(260, Math.min(w * 0.32, w - 540)) : w / 2;
			const cy = h / 2 - 12;

			// Satellite node coordinates relative to db center
			const replica = { x: cx - 210, y: cy + 45 };
			const gateway = { x: cx + 185, y: cy - 70 };
			const vault = { x: cx - 50, y: cy - 190 };
			const cache = { x: cx - 145, y: cy + 185 };

			return { isDesktop, cx, cy, replica, gateway, vault, cache };
		};

		// Laser data packets running along multi-segment conduits
		const packets: CircuitPacket[] = [];

		const initPackets = (layout: ReturnType<typeof getLayout>) => {
			packets.length = 0;
			const { cx, cy, replica, gateway, vault, cache } = layout;

			// Define circuit pathways with right-angle bends
			const conduits: { x: number; y: number }[][] = [
				// Replica -> Master DB
				[
					{ x: replica.x, y: replica.y },
					{ x: replica.x + 80, y: replica.y },
					{ x: replica.x + 80, y: cy + 30 },
					{ x: cx - 90, y: cy + 30 },
				],
				// Master DB -> Gateway
				[
					{ x: cx + 90, y: cy - 25 },
					{ x: gateway.x - 70, y: cy - 25 },
					{ x: gateway.x - 70, y: gateway.y },
					{ x: gateway.x, y: gateway.y },
				],
				// Vault -> Master DB
				[
					{ x: vault.x, y: vault.y },
					{ x: vault.x, y: cy - 100 },
					{ x: cx, y: cy - 100 },
					{ x: cx, y: cy - 65 },
				],
				// Master DB -> Cache
				[
					{ x: cx - 40, y: cy + 65 },
					{ x: cx - 40, y: cache.y - 45 },
					{ x: cache.x, y: cache.y - 45 },
					{ x: cache.x, y: cache.y },
				],
				// Gateway -> Vault cross-link
				[
					{ x: gateway.x, y: gateway.y },
					{ x: gateway.x, y: vault.y },
					{ x: vault.x + 60, y: vault.y },
				],
				// Replica -> Cache cross-link
				[
					{ x: replica.x, y: replica.y },
					{ x: replica.x, y: cache.y },
					{ x: cache.x - 50, y: cache.y },
				],
			];

			conduits.forEach((waypoints, idx) => {
				for (let i = 0; i < 3; i++) {
					packets.push({
						waypoints,
						progress: (i * 0.33 + idx * 0.17) % 1,
						speed: 0.00175 + Math.random() * 0.0015,
						color:
							idx % 3 === 0 ? "#10B981" : idx % 3 === 1 ? "#38BDF8" : "#F59E0B",
						size: 2.2 + (i % 2) * 0.8,
					});
				}
			});
		};

		initPackets(getLayout(width, height));

		let prevWidth = width;
		let prevHeight = height;

		// Animation Loop
		const render = (timestamp: number) => {
			if (isDestroyed) return;

			// Handle dimension change
			const layout = getLayout(width, height);
			if (width !== prevWidth || height !== prevHeight) {
				prevWidth = width;
				prevHeight = height;
				initPackets(layout);
			}

			ctx.clearRect(0, 0, width, height);

			// 1. Draw pre-rendered background dot matrix (1:1 physical pixel mapping to prevent DPR scaling/clipping bug)
			ctx.save();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.drawImage(bgCanvas, 0, 0);
			ctx.restore();

			// 2. Mouse spotlight: illuminate nearby dots dynamically
			if (mouseX > -500) {
				const spotRadius = 150;
				const startCol = Math.max(
					0,
					Math.floor((mouseX - spotRadius) / dotPitch),
				);
				const endCol = Math.min(
					Math.ceil(width / dotPitch),
					Math.ceil((mouseX + spotRadius) / dotPitch),
				);
				const startRow = Math.max(
					0,
					Math.floor((mouseY - spotRadius) / dotPitch),
				);
				const endRow = Math.min(
					Math.ceil(height / dotPitch),
					Math.ceil((mouseY + spotRadius) / dotPitch),
				);

				for (let col = startCol; col <= endCol; col++) {
					const dx = col * dotPitch + dotPitch / 2;
					for (let row = startRow; row <= endRow; row++) {
						const dy = row * dotPitch + dotPitch / 2;
						const dist = Math.hypot(dx - mouseX, dy - mouseY);
						if (dist < spotRadius) {
							const intensity = (1 - dist / spotRadius) ** 2;
							ctx.fillStyle = isDark
								? `rgba(52, 211, 153, ${intensity * 0.75})`
								: `rgba(5, 150, 105, ${intensity * 0.65})`;
							ctx.beginPath();
							ctx.arc(dx, dy, 0.9 + intensity * 1.3, 0, Math.PI * 2);
							ctx.fill();
						}
					}
				}
			}

			// 3. Process and render click ripples
			for (let i = ripples.length - 1; i >= 0; i--) {
				const r = ripples[i];
				r.radius += 4;
				r.alpha = 1 - r.radius / r.maxRadius;
				if (r.alpha <= 0) {
					ripples.splice(i, 1);
					continue;
				}

				ctx.strokeStyle = isDark
					? `rgba(56, 189, 248, ${r.alpha * 0.4})`
					: `rgba(2, 132, 199, ${r.alpha * 0.35})`;
				ctx.lineWidth = 1.5;
				ctx.beginPath();
				ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
				ctx.stroke();
			}

			const { isDesktop, cx, cy, replica, gateway, vault, cache } = layout;

			// Theme color tokens
			const brandEmerald = isDark ? "#10B981" : "#059669";
			const brandCyan = isDark ? "#38BDF8" : "#0284C7";
			const brandAmber = isDark ? "#F59E0B" : "#D97706";
			const conduitBaseColor = isDark
				? "rgba(255, 255, 255, 0.08)"
				: "rgba(24, 24, 27, 0.08)";
			const conduitGlowColor = isDark
				? "rgba(52, 211, 153, 0.25)"
				: "rgba(5, 150, 105, 0.25)";

			// Helper to draw isometric wireframe box
			const drawIsometricBox = (
				bx: number,
				by: number,
				bw: number,
				bh: number,
				bd: number,
				color: string,
			) => {
				ctx.save();
				ctx.strokeStyle = color;
				ctx.fillStyle = isDark
					? "rgba(15, 23, 42, 0.75)"
					: "rgba(255, 255, 255, 0.75)";
				ctx.lineWidth = 1;

				// Top face
				ctx.beginPath();
				ctx.moveTo(bx, by - bd);
				ctx.lineTo(bx + bw, by);
				ctx.lineTo(bx, by + bd);
				ctx.lineTo(bx - bw, by);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();

				// Left face
				ctx.beginPath();
				ctx.moveTo(bx - bw, by);
				ctx.lineTo(bx, by + bd);
				ctx.lineTo(bx, by + bd + bh);
				ctx.lineTo(bx - bw, by + bh);
				ctx.closePath();
				ctx.fillStyle = isDark
					? "rgba(10, 15, 30, 0.85)"
					: "rgba(240, 244, 248, 0.85)";
				ctx.fill();
				ctx.stroke();

				// Right face
				ctx.beginPath();
				ctx.moveTo(bx, by + bd);
				ctx.lineTo(bx + bw, by);
				ctx.lineTo(bx + bw, by + bh);
				ctx.lineTo(bx, by + bd + bh);
				ctx.closePath();
				ctx.fillStyle = isDark
					? "rgba(18, 28, 48, 0.7)"
					: "rgba(230, 236, 242, 0.7)";
				ctx.fill();
				ctx.stroke();

				ctx.restore();
			};

			// =======================================================================
			// 4. DRAW CONDUIT BUS TRACKS (Highways between nodes and DB)
			// =======================================================================
			const drawConduitTrack = (pts: { x: number; y: number }[]) => {
				if (pts.length < 2) return;
				ctx.save();
				// Base line
				ctx.strokeStyle = conduitBaseColor;
				ctx.lineWidth = 1.2;
				ctx.setLineDash([4, 6]);
				ctx.beginPath();
				ctx.moveTo(pts[0].x, pts[0].y);
				for (let i = 1; i < pts.length; i++) {
					ctx.lineTo(pts[i].x, pts[i].y);
				}
				ctx.stroke();

				// Subtle corner anchor dots
				ctx.fillStyle = conduitGlowColor;
				for (const pt of pts) {
					ctx.beginPath();
					ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
					ctx.fill();
				}
				ctx.restore();
			};

			// Draw all tracks
			drawConduitTrack([
				{ x: replica.x, y: replica.y },
				{ x: replica.x + 80, y: replica.y },
				{ x: replica.x + 80, y: cy + 30 },
				{ x: cx - 90, y: cy + 30 },
			]);
			drawConduitTrack([
				{ x: cx + 90, y: cy - 25 },
				{ x: gateway.x - 70, y: cy - 25 },
				{ x: gateway.x - 70, y: gateway.y },
				{ x: gateway.x, y: gateway.y },
			]);
			drawConduitTrack([
				{ x: vault.x, y: vault.y },
				{ x: vault.x, y: cy - 100 },
				{ x: cx, y: cy - 100 },
				{ x: cx, y: cy - 65 },
			]);
			drawConduitTrack([
				{ x: cx - 40, y: cy + 65 },
				{ x: cx - 40, y: cache.y - 45 },
				{ x: cache.x, y: cache.y - 45 },
				{ x: cache.x, y: cache.y },
			]);
			drawConduitTrack([
				{ x: gateway.x, y: gateway.y },
				{ x: gateway.x, y: vault.y },
				{ x: vault.x + 60, y: vault.y },
			]);
			drawConduitTrack([
				{ x: replica.x, y: replica.y },
				{ x: replica.x, y: cache.y },
				{ x: cache.x - 50, y: cache.y },
			]);

			// =======================================================================
			// 5. DRAW FLOWING COMET DATA PACKETS
			// =======================================================================
			packets.forEach((p) => {
				p.progress += p.speed;
				if (p.progress > 1) p.progress = 0;

				// Calculate position along waypoints
				const waypoints = p.waypoints;
				let totalLen = 0;
				const dists: number[] = [];
				for (let i = 0; i < waypoints.length - 1; i++) {
					const d = Math.hypot(
						waypoints[i + 1].x - waypoints[i].x,
						waypoints[i + 1].y - waypoints[i].y,
					);
					dists.push(d);
					totalLen += d;
				}

				const targetDist = p.progress * totalLen;
				let traversed = 0;
				let currX = waypoints[0].x;
				let currY = waypoints[0].y;
				let prevX = currX;
				let prevY = currY;

				for (let i = 0; i < dists.length; i++) {
					if (traversed + dists[i] >= targetDist) {
						const segT = (targetDist - traversed) / dists[i];
						currX =
							waypoints[i].x + (waypoints[i + 1].x - waypoints[i].x) * segT;
						currY =
							waypoints[i].y + (waypoints[i + 1].y - waypoints[i].y) * segT;
						// Previous point for tail
						const tailT = Math.max(0, segT - 0.15);
						prevX =
							waypoints[i].x + (waypoints[i + 1].x - waypoints[i].x) * tailT;
						prevY =
							waypoints[i].y + (waypoints[i + 1].y - waypoints[i].y) * tailT;
						break;
					}
					traversed += dists[i];
				}

				// Comet trailing tail
				ctx.save();
				const tailGrad = ctx.createLinearGradient(prevX, prevY, currX, currY);
				tailGrad.addColorStop(0, "rgba(0,0,0,0)");
				tailGrad.addColorStop(1, p.color);
				ctx.strokeStyle = tailGrad;
				ctx.lineWidth = p.size;
				ctx.beginPath();
				ctx.moveTo(prevX, prevY);
				ctx.lineTo(currX, currY);
				ctx.stroke();

				// Glowing comet head
				ctx.fillStyle = p.color;
				ctx.shadowColor = p.color;
				ctx.shadowBlur = 10;
				ctx.beginPath();
				ctx.arc(currX, currY, p.size, 0, Math.PI * 2);
				ctx.fill();
				ctx.restore();
			});

			// =======================================================================
			// 6. DRAW 3D MASTER DATABASE CYLINDERS (PostgreSQL Cluster)
			// =======================================================================
			const platters = [
				{ y: cy - 55, h: 20 },
				{ y: cy - 15, h: 20 },
				{ y: cy + 25, h: 20 },
				{ y: cy + 65, h: 20 },
			];
			const rx = 105;
			const ry = 34;

			// Background glow behind database
			const dbGlow = ctx.createRadialGradient(
				cx,
				cy + 10,
				10,
				cx,
				cy + 10,
				rx * 1.5,
			);
			dbGlow.addColorStop(
				0,
				isDark ? "rgba(16, 185, 129, 0.12)" : "rgba(16, 185, 129, 0.08)",
			);
			dbGlow.addColorStop(
				0.5,
				isDark ? "rgba(56, 189, 248, 0.05)" : "rgba(2, 132, 199, 0.04)",
			);
			dbGlow.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = dbGlow;
			ctx.beginPath();
			ctx.arc(cx, cy + 10, rx * 1.6, 0, Math.PI * 2);
			ctx.fill();

			// Render each cylinder platter from bottom to top
			platters
				.slice()
				.reverse()
				.forEach((p, idx) => {
					const isTop = idx === platters.length - 1;

					// Cylinder Wall
					ctx.save();
					const wallGrad = ctx.createLinearGradient(
						cx - rx,
						p.y,
						cx + rx,
						p.y + p.h,
					);
					if (isDark) {
						wallGrad.addColorStop(0, "rgba(15, 23, 42, 0.88)");
						wallGrad.addColorStop(0.3, "rgba(20, 35, 55, 0.82)");
						wallGrad.addColorStop(0.7, "rgba(16, 185, 129, 0.15)");
						wallGrad.addColorStop(1, "rgba(15, 23, 42, 0.88)");
					} else {
						wallGrad.addColorStop(0, "rgba(240, 244, 248, 0.92)");
						wallGrad.addColorStop(0.5, "rgba(220, 230, 242, 0.92)");
						wallGrad.addColorStop(1, "rgba(240, 244, 248, 0.92)");
					}

					ctx.fillStyle = wallGrad;
					ctx.strokeStyle = isDark
						? "rgba(52, 211, 153, 0.35)"
						: "rgba(5, 150, 105, 0.3)";
					ctx.lineWidth = 1;

					ctx.beginPath();
					ctx.ellipse(cx, p.y + p.h, rx, ry, 0, 0, Math.PI);
					ctx.lineTo(cx - rx, p.y);
					ctx.ellipse(cx, p.y, rx, ry, 0, Math.PI, 0, true);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();

					// Micro vertical activity indicator ticks on cylinder walls
					const tickCount = 14;
					for (let t = 1; t < tickCount; t++) {
						const angle = (t / tickCount) * Math.PI;
						const tx = cx - Math.cos(angle) * (rx * 0.92);
						const ty1 = p.y + Math.sin(angle) * (ry * 0.92) + 2;
						const ty2 = ty1 + p.h - 4;

						const tickPulse =
							Math.sin(timestamp * 0.005 + t * 0.8 + idx * 1.5) > 0.4;
						ctx.strokeStyle = tickPulse
							? isDark
								? brandEmerald
								: "#059669"
							: isDark
								? "rgba(255, 255, 255, 0.08)"
								: "rgba(0, 0, 0, 0.08)";
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(tx, ty1);
						ctx.lineTo(tx, ty2);
						ctx.stroke();
					}

					// Platter Top Face
					const discGrad = ctx.createRadialGradient(cx, p.y, 10, cx, p.y, rx);
					if (isDark) {
						discGrad.addColorStop(0, "rgba(25, 45, 65, 0.95)");
						discGrad.addColorStop(0.6, "rgba(16, 28, 45, 0.95)");
						discGrad.addColorStop(1, "rgba(10, 18, 30, 0.95)");
					} else {
						discGrad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
						discGrad.addColorStop(0.7, "rgba(240, 246, 252, 0.95)");
						discGrad.addColorStop(1, "rgba(225, 235, 245, 0.95)");
					}

					ctx.fillStyle = discGrad;
					ctx.strokeStyle = isTop
						? brandEmerald
						: isDark
							? "rgba(56, 189, 248, 0.4)"
							: "rgba(2, 132, 199, 0.35)";
					ctx.lineWidth = isTop ? 1.5 : 1;
					ctx.beginPath();
					ctx.ellipse(cx, p.y, rx, ry, 0, 0, Math.PI * 2);
					ctx.fill();
					ctx.stroke();

					// Inner storage concentric track rings
					ctx.strokeStyle = isDark
						? "rgba(255, 255, 255, 0.08)"
						: "rgba(0, 0, 0, 0.08)";
					ctx.lineWidth = 0.8;
					ctx.beginPath();
					ctx.ellipse(cx, p.y, rx * 0.7, ry * 0.7, 0, 0, Math.PI * 2);
					ctx.stroke();

					ctx.beginPath();
					ctx.ellipse(cx, p.y, rx * 0.4, ry * 0.4, 0, 0, Math.PI * 2);
					ctx.stroke();

					// Top center pulsing LED core on top platter
					if (isTop) {
						const corePulse = (Math.sin(timestamp * 0.004) + 1) / 2;
						ctx.fillStyle = brandEmerald;
						ctx.shadowColor = brandEmerald;
						ctx.shadowBlur = 12;
						ctx.beginPath();
						ctx.ellipse(
							cx,
							p.y,
							6 + corePulse * 2,
							2.5 + corePulse,
							0,
							0,
							Math.PI * 2,
						);
						ctx.fill();
						ctx.shadowBlur = 0;
					}

					ctx.restore();
				});

			// =======================================================================
			// 7. ORBITING HOLOGRAPHIC DATA RING (3D perspective around database)
			// =======================================================================
			ctx.save();
			const orbitRx = 145;
			const orbitRy = 48;
			const tiltAngle = -0.22; // subtle tilt

			ctx.translate(cx, cy + 10);
			ctx.rotate(tiltAngle);

			// Elliptical orbit trace
			ctx.strokeStyle = isDark
				? "rgba(56, 189, 248, 0.22)"
				: "rgba(2, 132, 199, 0.2)";
			ctx.lineWidth = 1;
			ctx.setLineDash([3, 7]);
			ctx.beginPath();
			ctx.ellipse(0, 0, orbitRx, orbitRy, 0, 0, Math.PI * 2);
			ctx.stroke();
			ctx.setLineDash([]);

			// Orbiting data nodes
			const nodeCount = 5;
			for (let i = 0; i < nodeCount; i++) {
				const orbitTheta = timestamp * 0.0018 + (i * Math.PI * 2) / nodeCount;
				const ox = Math.cos(orbitTheta) * orbitRx;
				const oy = Math.sin(orbitTheta) * orbitRy;
				const isFront = Math.sin(orbitTheta) > 0;

				const nodeRadius = isFront ? 3.5 : 2;
				const nodeAlpha = isFront ? 0.95 : 0.4;
				const nodeColor = i % 2 === 0 ? brandEmerald : brandCyan;

				ctx.fillStyle = nodeColor;
				ctx.shadowColor = nodeColor;
				ctx.shadowBlur = isFront ? 8 : 2;
				ctx.globalAlpha = nodeAlpha;
				ctx.beginPath();
				ctx.arc(ox, oy, nodeRadius, 0, Math.PI * 2);
				ctx.fill();
				ctx.globalAlpha = 1;
				ctx.shadowBlur = 0;
			}
			ctx.restore();

			// =======================================================================
			// 8. DRAW SATELLITE ARCHITECTURE NODES
			// =======================================================================

			// Node A: HETZNER VPS READ REPLICA (Left) - Isometric Server Tower
			drawIsometricBox(
				replica.x,
				replica.y - 20,
				26,
				48,
				14,
				isDark ? "rgba(245, 158, 11, 0.45)" : "rgba(217, 119, 6, 0.4)",
			);
			// Server rack activity LEDs
			for (let slot = 0; slot < 3; slot++) {
				const slotY = replica.y - 10 + slot * 14;
				const ledBlink = Math.sin(timestamp * 0.006 + slot * 2) > 0;
				ctx.fillStyle = ledBlink ? brandAmber : "rgba(245, 158, 11, 0.25)";
				ctx.beginPath();
				ctx.arc(replica.x - 8, slotY, 1.8, 0, Math.PI * 2);
				ctx.fill();

				ctx.fillStyle = brandEmerald;
				ctx.beginPath();
				ctx.arc(replica.x - 2, slotY, 1.8, 0, Math.PI * 2);
				ctx.fill();
			}

			// Node B: KONG API GATEWAY (Right) - Isometric Gateway Portal
			drawIsometricBox(
				gateway.x,
				gateway.y - 12,
				24,
				28,
				12,
				isDark ? "rgba(16, 185, 129, 0.5)" : "rgba(5, 150, 105, 0.45)",
			);
			// Radar ping ring radiating from gateway
			const gatewayPing = (Math.sin(timestamp * 0.003) + 1) / 2;
			ctx.strokeStyle = `rgba(${isDark ? "16, 185, 129" : "5, 150, 105"}, ${0.6 - gatewayPing * 0.55})`;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.arc(gateway.x, gateway.y, 8 + gatewayPing * 24, 0, Math.PI * 2);
			ctx.stroke();

			// Node C: S3 ENCRYPTED COLD STORAGE (Top) - Security Vault Cube
			drawIsometricBox(
				vault.x,
				vault.y - 16,
				22,
				24,
				12,
				isDark ? "rgba(56, 189, 248, 0.5)" : "rgba(2, 132, 199, 0.45)",
			);
			// Vault orbital halo
			ctx.strokeStyle = isDark
				? "rgba(56, 189, 248, 0.4)"
				: "rgba(2, 132, 199, 0.35)";
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.ellipse(vault.x, vault.y - 8, 28, 9, 0, 0, Math.PI * 2);
			ctx.stroke();

			// Node D: REDIS IN-MEMORY CACHE (Bottom) - Memory Matrix Block
			drawIsometricBox(
				cache.x,
				cache.y - 12,
				26,
				20,
				13,
				isDark ? "rgba(244, 63, 94, 0.45)" : "rgba(225, 29, 72, 0.4)",
			);
			// Cache micro cells
			for (let mx = -1; mx <= 1; mx++) {
				for (let my = -1; my <= 1; my++) {
					const cellActive =
						Math.sin(timestamp * 0.005 + mx * 1.5 + my * 2.2) > 0.1;
					ctx.fillStyle = cellActive
						? "#F43F5E"
						: isDark
							? "rgba(255,255,255,0.1)"
							: "rgba(0,0,0,0.1)";
					ctx.beginPath();
					ctx.arc(cache.x + mx * 7, cache.y + my * 3 - 3, 1.3, 0, Math.PI * 2);
					ctx.fill();
				}
			}

			// =======================================================================
			// 9. DRAW CAL.COM-STYLE HUD CALLOUT BADGES (Blueprint Annotations)
			// =======================================================================
			interface HudCallout {
				nodeX: number;
				nodeY: number;
				badgeX: number;
				badgeY: number;
				badgeW: number;
				badgeH: number;
				color: string;
				title: string;
				subtitle: string;
			}

			const callouts: HudCallout[] = [
				{
					nodeX: cx,
					nodeY: cy - 55,
					badgeX: cx - 180,
					badgeY: cy - 100,
					badgeW: 138,
					badgeH: 34,
					color: brandEmerald,
					title: "POSTGRESQL 16.2",
					subtitle: "PRIMARY · 99.99%",
				},
				{
					nodeX: replica.x,
					nodeY: replica.y,
					badgeX: replica.x - 150,
					badgeY: replica.y - 25,
					badgeW: 135,
					badgeH: 34,
					color: brandAmber,
					title: "HETZNER VPS 01",
					subtitle: "REPLICA · 0.4ms LAG",
				},
				{
					nodeX: gateway.x,
					nodeY: gateway.y,
					badgeX: gateway.x + 35,
					badgeY: gateway.y - 30,
					badgeW: 130,
					badgeH: 34,
					color: brandEmerald,
					title: "KONG GATEWAY",
					subtitle: "EDGE · HTTP/3 QUIC",
				},
				{
					nodeX: vault.x,
					nodeY: vault.y,
					badgeX: vault.x + 35,
					badgeY: vault.y - 25,
					badgeW: 125,
					badgeH: 34,
					color: brandCyan,
					title: "S3 OBJECT STORE",
					subtitle: "VAULT · AES-256",
				},
				{
					nodeX: cache.x,
					nodeY: cache.y,
					badgeX: cache.x - 145,
					badgeY: cache.y + 15,
					badgeW: 125,
					badgeH: 34,
					color: "#F43F5E",
					title: "REDIS CLUSTER",
					subtitle: "CACHE · 99.4% HIT",
				},
			];

			if (isDesktop && width > 860) {
				callouts.forEach((c) => {
					// Leader line from node to badge
					ctx.save();
					ctx.strokeStyle = isDark
						? "rgba(255, 255, 255, 0.18)"
						: "rgba(24, 24, 27, 0.18)";
					ctx.lineWidth = 1;

					// Anchor dot on node
					ctx.fillStyle = c.color;
					ctx.beginPath();
					ctx.arc(c.nodeX, c.nodeY, 2.5, 0, Math.PI * 2);
					ctx.fill();

					// Elbow line
					const isBadgeOnLeft = c.badgeX < c.nodeX;
					const elbowX = isBadgeOnLeft ? c.badgeX + c.badgeW : c.badgeX;
					const elbowY = c.badgeY + c.badgeH / 2;

					ctx.beginPath();
					ctx.moveTo(c.nodeX, c.nodeY);
					ctx.lineTo(elbowX, c.nodeY);
					ctx.lineTo(elbowX, elbowY);
					ctx.stroke();

					// Badge container (Glass pill)
					ctx.fillStyle = isDark
						? "rgba(12, 18, 30, 0.88)"
						: "rgba(255, 255, 255, 0.92)";
					ctx.strokeStyle = isDark
						? "rgba(255, 255, 255, 0.12)"
						: "rgba(0, 0, 0, 0.08)";
					ctx.lineWidth = 1;

					// Rounded rect pill
					const r = 6;
					ctx.beginPath();
					ctx.moveTo(c.badgeX + r, c.badgeY);
					ctx.arcTo(
						c.badgeX + c.badgeW,
						c.badgeY,
						c.badgeX + c.badgeW,
						c.badgeY + c.badgeH,
						r,
					);
					ctx.arcTo(
						c.badgeX + c.badgeW,
						c.badgeY + c.badgeH,
						c.badgeX,
						c.badgeY + c.badgeH,
						r,
					);
					ctx.arcTo(c.badgeX, c.badgeY + c.badgeH, c.badgeX, c.badgeY, r);
					ctx.arcTo(c.badgeX, c.badgeY, c.badgeX + c.badgeW, c.badgeY, r);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();

					// Pulsing LED dot inside badge
					const ledPulse = (Math.sin(timestamp * 0.004) + 1) / 2;
					ctx.fillStyle = c.color;
					ctx.shadowColor = c.color;
					ctx.shadowBlur = 6;
					ctx.beginPath();
					ctx.arc(
						c.badgeX + 12,
						c.badgeY + 13,
						3 + ledPulse * 0.8,
						0,
						Math.PI * 2,
					);
					ctx.fill();
					ctx.shadowBlur = 0;

					// Title text
					ctx.font = '600 10px monospace, "Inter", sans-serif';
					ctx.fillStyle = isDark
						? "rgba(255, 255, 255, 0.92)"
						: "rgba(24, 24, 27, 0.92)";
					ctx.fillText(c.title, c.badgeX + 22, c.badgeY + 15);

					// Subtitle text
					ctx.font = '400 8.5px monospace, "Inter", sans-serif';
					ctx.fillStyle = isDark
						? "rgba(255, 255, 255, 0.5)"
						: "rgba(24, 24, 27, 0.5)";
					ctx.fillText(c.subtitle, c.badgeX + 22, c.badgeY + 27);

					ctx.restore();
				});
			}

			animationFrameId = requestAnimationFrame(render);
		};

		animationFrameId = requestAnimationFrame(render);

		return () => {
			isDestroyed = true;
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseleave", onMouseLeave);
			canvas.removeEventListener("click", onClick);
		};
	}, [isDark]);

	// Telemetry indicators matching Cal.com's bottom status indicators
	const telemetryItems = [
		{ label: "US-EAST (N. VA)", sub: "11ms · 99.99%" },
		{ label: "EU-CENTRAL (FRA)", sub: "24ms · 100%" },
		{ label: "AP-SOUTHEAST (SIN)", sub: "45ms · 99.98%" },
		{ label: "POSTGRES 16.2", sub: i18n._("Primary Node · Active") },
		{ label: "REPLICATION LAG", sub: "0.3ms · Synced" },
		{ label: "SSL / TLS 1.3", sub: "Auto-Renewed" },
	];

	return (
		<div ref={containerRef} className={styles.canvasWrapper} aria-hidden="true">
			<div className={styles.radialOverlay} />

			{/* Cal.com style vertical grid separator lines */}
			<div className={styles.gridLinesOverlay}>
				<div className={styles.gridLine} />
				<div className={styles.gridLine} />
				<div className={styles.gridLine} />
				<div className={styles.gridLine} />
				<div className={styles.gridLine} />
				<div className={styles.gridLine} />
				<div className={styles.gridLine} />
			</div>

			<canvas ref={canvasRef} className={styles.canvas} />

			{/* Cal.com style bottom telemetry bar */}
			<div className={styles.telemetryBar}>
				{telemetryItems.map((item) => (
					<div key={item.label} className={styles.telemetryItem}>
						<div className={styles.telemetryLabel}>
							<span className={styles.telemetryDot} />
							<span>{item.label}</span>
						</div>
						<span className={styles.telemetrySub}>{item.sub}</span>
					</div>
				))}
			</div>
		</div>
	);
}
