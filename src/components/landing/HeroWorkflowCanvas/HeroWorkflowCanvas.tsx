import { useLingui } from "@lingui/react";
import { useMantineColorScheme } from "@mantine/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./HeroWorkflowCanvas.module.css";

interface Ripple {
	x: number;
	y: number;
	radius: number;
	maxRadius: number;
	alpha: number;
}

interface CircuitPacket {
	conduitIndex: number;
	waypoints: { x: number; y: number }[];
	progress: number;
	speed: number;
	color: string;
	size: number;
}

interface WorkflowStation {
	id: string;
	stageNumber: string;
	name: string;
	badgeTitle: string;
	subtitle: string;
	status: string;
	statusColor: string;
	accentColor: string;
	description: string;
	specs: string[];
}

export function HeroWorkflowCanvas() {
	const { i18n } = useLingui();
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === "dark";

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const [selectedStationId, setSelectedStationId] = useState<string | null>(
		null,
	);
	const [hoveredStationId, setHoveredStationId] = useState<string | null>(null);
	const [simulating, setSimulating] = useState(false);
	const [activeStageIndex, setActiveStageIndex] = useState<number | null>(null);
	const [currentLogIndex, setCurrentLogIndex] = useState(0);

	const hoveredStationRef = useRef<string | null>(null);
	const selectedStationRef = useRef<string | null>(null);
	const activeStageRef = useRef<number | null>(null);

	useEffect(() => {
		hoveredStationRef.current = hoveredStationId;
	}, [hoveredStationId]);

	useEffect(() => {
		selectedStationRef.current = selectedStationId;
	}, [selectedStationId]);

	useEffect(() => {
		activeStageRef.current = activeStageIndex;
	}, [activeStageIndex]);

	// Authentic SaaSBase Pipeline Stations
	const stations: WorkflowStation[] = useMemo(
		() => [
			{
				id: "vps",
				stageNumber: "01",
				name: i18n._("Target VPS & Host"),
				badgeTitle: "01 // TARGET VPS",
				subtitle: "UBUNTU · DOCKER 27 · TRAEFIK V3",
				status: i18n._("CONNECTED"),
				statusColor: "#10b981",
				accentColor: "#f59e0b",
				description: i18n._(
					"SSH2 handshake, host facts probe, Docker Engine 27 & Traefik v3 proxy with automatic TLS 1.3.",
				),
				specs: [
					i18n._("SSH2 TOFU Host Key Fingerprint"),
					i18n._("Traefik v3 Reverse Proxy (Ports 80/443)"),
					i18n._("Docker Engine 27.3.1 + Traefik v3 proxy ready"),
				],
			},
			{
				id: "forge",
				stageNumber: "02",
				name: i18n._("Engine & Secret Forge"),
				badgeTitle: "02 // SECRET FORGE",
				subtitle: "40-CHAR PASS · JWT · ES256 VAULT",
				status: i18n._("PROVISIONED"),
				statusColor: "#38bdf8",
				accentColor: "#8b5cf6",
				description: i18n._(
					"Pulls tested monthly Supabase releases, derives cryptographically safe passwords, JWT secrets and ES256 keys.",
				),
				specs: [
					i18n._("Auto 40-char DB Password & JWT Secret"),
					i18n._("overlay-api-keys.yml (Asymmetric ES256)"),
					i18n._("Transformed /etc/saasbase/apps Isolation"),
				],
			},
			{
				id: "stack",
				stageNumber: "03",
				name: i18n._("Supabase Core Stack"),
				badgeTitle: "03 // SUPABASE STACK",
				subtitle: "POSTGRES 16 · 12 SERVICES · STUDIO",
				status: i18n._("HEALTHY 100%"),
				statusColor: "#10b981",
				accentColor: "#10b981",
				description: i18n._(
					"High-performance PostgreSQL 16 cluster with pgvector, Kong Gateway, GoTrue Auth, Realtime and Studio.",
				),
				specs: [
					i18n._("Postgres 16 + Supavisor Pooler"),
					i18n._("Kong Gateway & GoTrue Auth"),
					i18n._(
						"Central API ingress, GoTrue authentication, and instant PostgREST database reflection.",
					),
					i18n._("Realtime WebSockets CDC"),
				],
			},
			{
				id: "backup",
				stageNumber: "04",
				name: i18n._("Cloud Backups & Metrics"),
				badgeTitle: "04 // OFF-SITE VAULT",
				subtitle: "AES-256-CBC · S3 / R2 SYNC",
				status: i18n._("SYNCED"),
				statusColor: "#10b981",
				accentColor: "#06b6d4",
				description: i18n._(
					"Scheduled pg_dump backups encrypted with ENCRYPTION_KEY, rclone stream to S3/R2/B2, and live CPU/RAM telemetry.",
				),
				specs: [
					i18n._("pg_dump AES-256-CBC Encrypted"),
					i18n._("pg_dump encrypted (AES-256-CBC) -> Cloudflare R2 synced"),
					i18n._("Zero-Downtime Rollback on Failure"),
				],
			},
		],
		[i18n],
	);

	// Telemetry logs matching the 4 workflow steps
	const logs = useMemo(
		() => [
			{
				tag: "SSH",
				stage: 0,
				text: i18n._("SshExecutor: connected (host key SHA256 verified)"),
			},
			{
				tag: "BOOTSTRAP",
				stage: 0,
				text: i18n._("Docker Engine 27.3.1 + Traefik v3 proxy ready"),
			},
			{
				tag: "SECRETS",
				stage: 1,
				text: i18n._("Generated 40-char DB passwords & ES256 auth keys"),
			},
			{
				tag: "CLUSTER",
				stage: 2,
				text: i18n._("Postgres 16, Kong, GoTrue, Realtime, Studio healthy"),
			},
			{
				tag: "BACKUP",
				stage: 3,
				text: i18n._("pg_dump encrypted (AES-256-CBC) -> Cloudflare R2 synced"),
			},
		],
		[i18n],
	);

	// Auto rotate logs when not actively simulating
	useEffect(() => {
		if (simulating) return;
		const interval = setInterval(() => {
			setCurrentLogIndex((prev) => (prev + 1) % logs.length);
		}, 3800);
		return () => clearInterval(interval);
	}, [simulating, logs.length]);

	// Trigger automated simulated deployment pipeline
	const handleSimulateDeploy = useCallback(() => {
		if (simulating) return;
		setSimulating(true);

		// Animate through all 4 pipeline stages sequentially
		const timeouts = [
			setTimeout(() => {
				setActiveStageIndex(0);
				setCurrentLogIndex(0);
			}, 100),
			setTimeout(() => {
				setActiveStageIndex(0);
				setCurrentLogIndex(1);
			}, 1000),
			setTimeout(() => {
				setActiveStageIndex(1);
				setCurrentLogIndex(2);
			}, 2100),
			setTimeout(() => {
				setActiveStageIndex(2);
				setCurrentLogIndex(3);
			}, 3300),
			setTimeout(() => {
				setActiveStageIndex(3);
				setCurrentLogIndex(4);
			}, 4500),
			setTimeout(() => {
				setActiveStageIndex(null);
				setSimulating(false);
			}, 5800),
		];

		return () => {
			for (const t of timeouts) clearTimeout(t);
		};
	}, [simulating]);

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

		// =========================================================================
		// 1. OFFSCREEN PRE-RENDERED HIGH-DENSITY DOT MATRIX (Cal.com Pitch 14)
		// =========================================================================
		const bgCanvas = document.createElement("canvas");
		const bgCtx = bgCanvas.getContext("2d");
		const dotPitch = 14;

		const rebuildBackground = () => {
			bgCanvas.width = Math.floor(width * dpr);
			bgCanvas.height = Math.floor(height * dpr);
			if (!bgCtx) return;
			bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
			bgCtx.clearRect(0, 0, width, height);

			const dotColor = isDark
				? "rgba(255, 255, 255, 0.05)"
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

		// Mouse & Click Interaction
		let mouseX = -1000;
		let mouseY = -1000;
		const ripples: Ripple[] = [];

		// =========================================================================
		// 2. RESPONSIVE ARCHITECTURAL LAYOUT (4 Pipeline Stations)
		// =========================================================================
		const getLayout = (w: number, h: number) => {
			const cx = w * 0.5;
			const cy = h * 0.48;
			const scale = Math.min(1.04, Math.max(0.74, w / 620));

			// 4 Strategic Workflow Stations:
			// Station 1: VPS Host (Left)
			const vps = { x: cx - 180 * scale, y: cy + 22 * scale };
			// Station 2: Secret Forge (Top-Middle)
			const forge = { x: cx - 35 * scale, y: cy - 135 * scale };
			// Station 3: Supabase Core Stack 3D Cylinders (Center-Right)
			const stack = { x: cx + 80 * scale, y: cy - 15 * scale };
			// Station 4: Off-site Encrypted Backup & Telemetry (Bottom-Right)
			const backup = { x: cx + 140 * scale, y: cy + 155 * scale };

			return { cx, cy, scale, vps, forge, stack, backup };
		};

		const onMouseMove = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;

			const layout = getLayout(width, height);
			const targets = [
				{ id: "vps", x: layout.vps.x, y: layout.vps.y, r: 42 },
				{ id: "forge", x: layout.forge.x, y: layout.forge.y, r: 40 },
				{ id: "stack", x: layout.stack.x, y: layout.stack.y, r: 65 },
				{ id: "backup", x: layout.backup.x, y: layout.backup.y, r: 42 },
			];

			let hId: string | null = null;
			for (const t of targets) {
				if (Math.hypot(mouseX - t.x, mouseY - t.y) < t.r) {
					hId = t.id;
					break;
				}
			}
			setHoveredStationId(hId);
			canvas.style.cursor = hId !== null ? "pointer" : "default";
		};

		const onMouseLeave = () => {
			mouseX = -1000;
			mouseY = -1000;
			setHoveredStationId(null);
			canvas.style.cursor = "default";
		};

		const handleActionAt = (clientX: number, clientY: number) => {
			const rect = canvas.getBoundingClientRect();
			const cx = clientX - rect.left;
			const cy = clientY - rect.top;

			ripples.push({
				x: cx,
				y: cy,
				radius: 0,
				maxRadius: 220,
				alpha: 1,
			});

			const layout = getLayout(width, height);
			const targets = [
				{ id: "vps", x: layout.vps.x, y: layout.vps.y, r: 48 * layout.scale },
				{
					id: "forge",
					x: layout.forge.x,
					y: layout.forge.y,
					r: 46 * layout.scale,
				},
				{
					id: "stack",
					x: layout.stack.x,
					y: layout.stack.y,
					r: 70 * layout.scale,
				},
				{
					id: "backup",
					x: layout.backup.x,
					y: layout.backup.y,
					r: 48 * layout.scale,
				},
			];

			let hitId: string | null = null;
			for (const t of targets) {
				if (Math.hypot(cx - t.x, cy - t.y) < t.r) {
					hitId = t.id;
					break;
				}
			}

			if (hitId) {
				setSelectedStationId((prev) => (prev === hitId ? null : hitId));
			} else {
				setSelectedStationId(null);
			}
		};

		const onClick = (e: MouseEvent) => {
			handleActionAt(e.clientX, e.clientY);
		};

		const onTouchStart = (e: TouchEvent) => {
			if (e.touches.length > 0) {
				const touch = e.touches[0];
				handleActionAt(touch.clientX, touch.clientY);
			}
		};

		canvas.addEventListener("mousemove", onMouseMove);
		canvas.addEventListener("mouseleave", onMouseLeave);
		canvas.addEventListener("click", onClick);
		canvas.addEventListener("touchstart", onTouchStart, { passive: true });

		// =========================================================================
		// 3. 90° ORTHOGONAL CIRCUIT CONDUITS (Strict SaaSBase Workflow Pipeline)
		// =========================================================================
		const conduits: {
			fromStation: string;
			toStation: string;
			waypoints: { x: number; y: number }[];
			color: string;
		}[] = [];

		const packets: CircuitPacket[] = [];

		const initWorkflowNetwork = (layout: ReturnType<typeof getLayout>) => {
			conduits.length = 0;
			packets.length = 0;
			const { scale, vps, forge, stack, backup } = layout;

			// Conduit 1: VPS -> Secret Forge (Host verification -> Secrets generation)
			conduits.push({
				fromStation: "vps",
				toStation: "forge",
				color: "#f59e0b",
				waypoints: [
					{ x: vps.x, y: vps.y },
					{ x: vps.x + 55 * scale, y: vps.y },
					{ x: vps.x + 55 * scale, y: forge.y + 35 * scale },
					{ x: forge.x - 30 * scale, y: forge.y + 35 * scale },
					{ x: forge.x, y: forge.y },
				],
			});

			// Conduit 2: Secret Forge -> Supabase Stack (Injecting secrets & compose orchestration)
			conduits.push({
				fromStation: "forge",
				toStation: "stack",
				color: "#8b5cf6",
				waypoints: [
					{ x: forge.x, y: forge.y },
					{ x: forge.x + 55 * scale, y: forge.y },
					{ x: forge.x + 55 * scale, y: stack.y - 75 * scale },
					{ x: stack.x, y: stack.y - 75 * scale },
					{ x: stack.x, y: stack.y - 45 * scale },
				],
			});

			// Conduit 3: Supabase Stack -> Off-site Backup (Automated pg_dump stream to S3/R2)
			conduits.push({
				fromStation: "stack",
				toStation: "backup",
				color: "#10b981",
				waypoints: [
					{ x: stack.x, y: stack.y + 45 * scale },
					{ x: stack.x, y: stack.y + 80 * scale },
					{ x: backup.x - 45 * scale, y: stack.y + 80 * scale },
					{ x: backup.x - 45 * scale, y: backup.y },
					{ x: backup.x, y: backup.y },
				],
			});

			// Conduit 4: Off-site Backup -> Target VPS (Feedback & Telemetry health loop)
			conduits.push({
				fromStation: "backup",
				toStation: "vps",
				color: "#06b6d4",
				waypoints: [
					{ x: backup.x, y: backup.y + 25 * scale },
					{ x: backup.x, y: backup.y + 60 * scale },
					{ x: vps.x, y: backup.y + 60 * scale },
					{ x: vps.x, y: vps.y + 35 * scale },
					{ x: vps.x, y: vps.y },
				],
			});

			// Spawn laser comets along conduits flowing in the workflow pipeline direction
			conduits.forEach((c, idx) => {
				for (let i = 0; i < 2; i++) {
					packets.push({
						conduitIndex: idx,
						waypoints: c.waypoints,
						progress: (i * 0.5 + idx * 0.22) % 1,
						speed: 0.00175 + Math.random() * 0.001,
						color: c.color,
						size: 2.2 + (i % 2) * 0.6,
					});
				}
			});
		};

		initWorkflowNetwork(getLayout(width, height));
		let prevWidth = width;
		let prevHeight = height;

		// Orbiting micro-service satellites around the Supabase Stack (50% slower speed)
		const coreServices = [
			{ name: "POSTGRES 16", color: "#38bdf8", angle: 0, speed: 0.009 },
			{ name: "KONG", color: "#10b981", angle: 1.05, speed: 0.009 },
			{ name: "GOTRUE", color: "#8b5cf6", angle: 2.1, speed: 0.009 },
			{ name: "POSTGREST", color: "#06b6d4", angle: 3.14, speed: 0.009 },
			{ name: "REALTIME", color: "#f59e0b", angle: 4.2, speed: 0.009 },
			{ name: "STUDIO", color: "#ec4899", angle: 5.25, speed: 0.009 },
		];

		// =========================================================================
		// 4. MAIN ANIMATION LOOP
		// =========================================================================
		let frame = 0;

		const render = (_timestamp: number) => {
			if (isDestroyed) return;
			frame++;

			const layout = getLayout(width, height);
			if (width !== prevWidth || height !== prevHeight) {
				prevWidth = width;
				prevHeight = height;
				initWorkflowNetwork(layout);
			}

			ctx.clearRect(0, 0, width, height);

			// 1. Draw pre-rendered background dot matrix (1:1 physical pixel mapping to prevent DPR scaling/clipping bug)
			ctx.save();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.drawImage(bgCanvas, 0, 0);
			ctx.restore();

			// 2. Interactive Mouse Spotlight (Smooth alpha falloff at radius boundary)
			if (mouseX > -500) {
				const spotRadius = 140;
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

			// 3. Process Click Shockwave Ripples
			for (let i = ripples.length - 1; i >= 0; i--) {
				const r = ripples[i];
				r.radius += 2.5;
				r.alpha *= 0.94;

				ctx.strokeStyle = isDark
					? `rgba(52, 211, 153, ${r.alpha * 0.6})`
					: `rgba(5, 150, 105, ${r.alpha * 0.5})`;
				ctx.lineWidth = 1.8;
				ctx.beginPath();
				ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
				ctx.stroke();

				if (r.alpha < 0.04 || r.radius > r.maxRadius) {
					ripples.splice(i, 1);
				}
			}

			// =====================================================================
			// 4. DRAW 90° ORTHOGONAL CIRCUIT BUSES WITH CORNER SOLDER PADS
			// =====================================================================
			const activeStage = activeStageRef.current;

			conduits.forEach((cond, idx) => {
				const isConduitActive = activeStage === idx;
				const wps = cond.waypoints;
				if (wps.length < 2) return;

				// Underglow track
				ctx.beginPath();
				ctx.moveTo(wps[0].x, wps[0].y);
				for (let j = 1; j < wps.length; j++) {
					ctx.lineTo(wps[j].x, wps[j].y);
				}

				ctx.strokeStyle = isConduitActive
					? cond.color
					: isDark
						? "rgba(255, 255, 255, 0.08)"
						: "rgba(24, 24, 27, 0.08)";
				ctx.lineWidth = isConduitActive ? 2.5 : 1.5;
				ctx.stroke();

				// Flowing dashed overlay
				ctx.save();
				ctx.beginPath();
				ctx.moveTo(wps[0].x, wps[0].y);
				for (let j = 1; j < wps.length; j++) {
					ctx.lineTo(wps[j].x, wps[j].y);
				}
				ctx.setLineDash([4, 8]);
				ctx.lineDashOffset = -frame * 0.35;
				ctx.strokeStyle = isDark ? `${cond.color}55` : `${cond.color}77`;
				ctx.lineWidth = 1.2;
				ctx.stroke();
				ctx.restore();

				// Solder pads at 90° bends
				for (let j = 1; j < wps.length - 1; j++) {
					const pt = wps[j];
					ctx.fillStyle = isDark ? "#27272a" : "#e4e4e7";
					ctx.strokeStyle = isDark
						? "rgba(255, 255, 255, 0.18)"
						: "rgba(0, 0, 0, 0.15)";
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
					ctx.fill();
					ctx.stroke();
				}
			});

			// =====================================================================
			// 5. DRAW FLOWING LASER PACKETS WITH TRAILING GRADIENTS
			// =====================================================================
			const getPolylinePos = (
				wps: { x: number; y: number }[],
				progress: number,
			) => {
				let totalDist = 0;
				for (let i = 0; i < wps.length - 1; i++) {
					totalDist += Math.hypot(
						wps[i + 1].x - wps[i].x,
						wps[i + 1].y - wps[i].y,
					);
				}
				let targetDist = progress * totalDist;
				for (let i = 0; i < wps.length - 1; i++) {
					const segDist = Math.hypot(
						wps[i + 1].x - wps[i].x,
						wps[i + 1].y - wps[i].y,
					);
					if (targetDist <= segDist) {
						const ratio = targetDist / segDist;
						return {
							x: wps[i].x + (wps[i + 1].x - wps[i].x) * ratio,
							y: wps[i].y + (wps[i + 1].y - wps[i].y) * ratio,
						};
					}
					targetDist -= segDist;
				}
				return wps[wps.length - 1];
			};

			packets.forEach((pkt) => {
				const isPktActive = activeStage === pkt.conduitIndex;
				pkt.progress =
					(pkt.progress + (isPktActive ? pkt.speed * 2.2 : pkt.speed)) % 1;

				const pos = getPolylinePos(pkt.waypoints, pkt.progress);
				const trailProgress = Math.max(0, pkt.progress - 0.035);
				const trailPos = getPolylinePos(pkt.waypoints, trailProgress);

				// Laser gradient tail (only drawn when moving forward, eliminating any wrap-around cross-screen flash)
				if (pkt.progress > 0.005) {
					const trailGrad = ctx.createLinearGradient(
						trailPos.x,
						trailPos.y,
						pos.x,
						pos.y,
					);
					trailGrad.addColorStop(0, "transparent");
					trailGrad.addColorStop(1, pkt.color);

					ctx.strokeStyle = trailGrad;
					ctx.lineWidth = pkt.size * (isPktActive ? 1.6 : 1);
					ctx.beginPath();
					ctx.moveTo(trailPos.x, trailPos.y);
					ctx.lineTo(pos.x, pos.y);
					ctx.stroke();
				}

				// Laser comet head
				ctx.fillStyle = "#ffffff";
				ctx.beginPath();
				ctx.arc(pos.x, pos.y, pkt.size * 0.7, 0, Math.PI * 2);
				ctx.fill();

				ctx.fillStyle = pkt.color;
				ctx.beginPath();
				ctx.arc(pos.x, pos.y, pkt.size * 1.5, 0, Math.PI * 2);
				ctx.fill();
			});

			// =====================================================================
			// 6. RENDER THE 4 PIPELINE STATIONS
			// =====================================================================
			const { scale, vps, forge, stack, backup } = layout;
			const isHovered = (id: string) =>
				hoveredStationRef.current === id || selectedStationRef.current === id;

			// ---------------------------------------------------------------------
			// STATION 01: TARGET VPS (Isometric Server Tower Chassis)
			// ---------------------------------------------------------------------
			{
				const isAct = isHovered("vps") || activeStage === 0;
				const vx = vps.x;
				const vy = vps.y;

				// Ambient ground glow
				const vGrad = ctx.createRadialGradient(vx, vy, 0, vx, vy, 45);
				vGrad.addColorStop(
					0,
					isAct ? "rgba(245, 158, 11, 0.28)" : "rgba(245, 158, 11, 0.08)",
				);
				vGrad.addColorStop(1, "transparent");
				ctx.fillStyle = vGrad;
				ctx.beginPath();
				ctx.arc(vx, vy, 45, 0, Math.PI * 2);
				ctx.fill();

				// 3D Isometric Server Chassis
				const sW = 34 * scale;
				const sH = 46 * scale;
				const isoAngle = Math.PI / 6;
				const cos = Math.cos(isoAngle);
				const sin = Math.sin(isoAngle);

				// Draw base isometric prism
				const topCenter = { x: vx, y: vy - sH * 0.45 };
				const p1 = { x: topCenter.x, y: topCenter.y - sW * 0.45 * sin };
				const p2 = { x: topCenter.x + sW * 0.65 * cos, y: topCenter.y };
				const p3 = { x: topCenter.x, y: topCenter.y + sW * 0.45 * sin };
				const p4 = { x: topCenter.x - sW * 0.65 * cos, y: topCenter.y };

				// Top Face
				ctx.fillStyle = isDark ? "#27272a" : "#f4f4f5";
				ctx.strokeStyle = isAct ? "#f59e0b" : isDark ? "#3f3f46" : "#cbd5e1";
				ctx.lineWidth = isAct ? 1.8 : 1.2;
				ctx.beginPath();
				ctx.moveTo(p1.x, p1.y);
				ctx.lineTo(p2.x, p2.y);
				ctx.lineTo(p3.x, p3.y);
				ctx.lineTo(p4.x, p4.y);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();

				// Left Face (Front Server Face with drive slots)
				const fBottom1 = { x: p4.x, y: p4.y + sH };
				const fBottom2 = { x: p3.x, y: p3.y + sH };

				ctx.fillStyle = isDark ? "#18181b" : "#e4e4e7";
				ctx.beginPath();
				ctx.moveTo(p4.x, p4.y);
				ctx.lineTo(p3.x, p3.y);
				ctx.lineTo(fBottom2.x, fBottom2.y);
				ctx.lineTo(fBottom1.x, fBottom1.y);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();

				// Right Face (Side Ventilation)
				const rBottom = { x: p2.x, y: p2.y + sH };
				ctx.fillStyle = isDark ? "#101012" : "#d4d4d8";
				ctx.beginPath();
				ctx.moveTo(p3.x, p3.y);
				ctx.lineTo(p2.x, p2.y);
				ctx.lineTo(rBottom.x, rBottom.y);
				ctx.lineTo(fBottom2.x, fBottom2.y);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();

				// Server Drive Bays on front face
				for (let d = 0; d < 3; d++) {
					const dy = p4.y + 8 * scale + d * 11 * scale;
					ctx.strokeStyle = isDark ? "#3f3f46" : "#cbd5e1";
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(p4.x + 3 * scale, dy);
					ctx.lineTo(p3.x - 7 * scale, dy + (p3.y - p4.y) * 0.8);
					ctx.stroke();

					// Blinking activity LEDs
					const blink = Math.sin(frame * 0.12 + d * 2) > 0;
					ctx.fillStyle = blink ? "#10b981" : "#06b6d4";
					ctx.beginPath();
					ctx.arc(
						p3.x - 4 * scale,
						dy + (p3.y - p4.y) * 0.8,
						1.8,
						0,
						Math.PI * 2,
					);
					ctx.fill();
				}
			}

			// ---------------------------------------------------------------------
			// STATION 02: SECRET FORGE (3D Isometric Cryptographic Vault)
			// ---------------------------------------------------------------------
			{
				const isAct = isHovered("forge") || activeStage === 1;
				const fx = forge.x;
				const fy = forge.y;

				// Ambient purple glow
				const fGrad = ctx.createRadialGradient(fx, fy, 0, fx, fy, 42);
				fGrad.addColorStop(
					0,
					isAct ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.08)",
				);
				fGrad.addColorStop(1, "transparent");
				ctx.fillStyle = fGrad;
				ctx.beginPath();
				ctx.arc(fx, fy, 42, 0, Math.PI * 2);
				ctx.fill();

				// Rotating outer cryptographic ring
				ctx.save();
				ctx.translate(fx, fy);
				ctx.rotate(frame * 0.015);
				ctx.strokeStyle = isAct ? "#8b5cf6" : isDark ? "#3f3f46" : "#cbd5e1";
				ctx.lineWidth = isAct ? 1.6 : 1.2;
				ctx.setLineDash([4, 6]);
				ctx.beginPath();
				ctx.arc(0, 0, 24 * scale, 0, Math.PI * 2);
				ctx.stroke();
				ctx.setLineDash([]);

				// Hexagonal cryptographic core
				ctx.rotate(-frame * 0.03);
				ctx.strokeStyle = isAct ? "#c084fc" : "#8b5cf6";
				ctx.lineWidth = 1.8;
				ctx.beginPath();
				for (let a = 0; a < 6; a++) {
					const ang = (a * Math.PI) / 3;
					const hx = Math.cos(ang) * 14 * scale;
					const hy = Math.sin(ang) * 14 * scale;
					if (a === 0) ctx.moveTo(hx, hy);
					else ctx.lineTo(hx, hy);
				}
				ctx.closePath();
				ctx.stroke();

				// Inner AES key diamond
				ctx.fillStyle = isAct ? "#38bdf8" : "#8b5cf6";
				ctx.beginPath();
				ctx.moveTo(0, -7 * scale);
				ctx.lineTo(7 * scale, 0);
				ctx.lineTo(0, 7 * scale);
				ctx.lineTo(-7 * scale, 0);
				ctx.closePath();
				ctx.fill();
				ctx.restore();
			}

			// ---------------------------------------------------------------------
			// STATION 03: SUPABASE CORE CLUSTER (The Master 3D Cylinders & Hologram)
			// ---------------------------------------------------------------------
			{
				const isAct = isHovered("stack") || activeStage === 2;
				const sx = stack.x;
				const sy = stack.y;

				// Large ambient database emerald glow
				const dbGlow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 110 * scale);
				dbGlow.addColorStop(
					0,
					isAct ? "rgba(16, 185, 129, 0.28)" : "rgba(16, 185, 129, 0.12)",
				);
				dbGlow.addColorStop(1, "transparent");
				ctx.fillStyle = dbGlow;
				ctx.beginPath();
				ctx.arc(sx, sy, 110 * scale, 0, Math.PI * 2);
				ctx.fill();

				// Orbit parameters
				const orbitRx = 86 * scale;
				const orbitRy = 32 * scale;
				const orbitTilt = -0.22;

				// Update satellite angles
				coreServices.forEach((srv) => {
					srv.angle += isAct ? srv.speed * 1.8 : srv.speed;
				});

				// 1. Draw BACK-HALF of Orbit Ring and Back Satellites (sin < 0) BEHIND cylinders
				ctx.save();
				ctx.translate(sx, sy);
				ctx.rotate(orbitTilt);

				ctx.strokeStyle = isDark
					? "rgba(16, 185, 129, 0.16)"
					: "rgba(16, 185, 129, 0.2)";
				ctx.lineWidth = 1.1;
				ctx.setLineDash([3, 5]);
				ctx.beginPath();
				ctx.ellipse(0, 0, orbitRx, orbitRy, 0, Math.PI, 0);
				ctx.stroke();
				ctx.setLineDash([]);

				coreServices.forEach((srv) => {
					if (Math.sin(srv.angle) < 0) {
						const ox = Math.cos(srv.angle) * orbitRx;
						const oy = Math.sin(srv.angle) * orbitRy;

						ctx.fillStyle = srv.color;
						ctx.globalAlpha = 0.65;
						ctx.beginPath();
						ctx.arc(ox, oy, 2.6, 0, Math.PI * 2);
						ctx.fill();
						ctx.globalAlpha = 1;
					}
				});
				ctx.restore();

				// 4-Tier Master Database Cylinders
				const numTiers = 4;
				const tierRadiusX = 52 * scale;
				const tierRadiusY = 16 * scale;
				const tierHeight = 15 * scale;
				const tierGap = 5 * scale;
				const totalStackHeight = (tierHeight + tierGap) * numTiers;
				const startY = sy + totalStackHeight / 2 - tierHeight;

				for (let t = numTiers - 1; t >= 0; t--) {
					const cyTier = startY - t * (tierHeight + tierGap);
					const isTop = t === numTiers - 1;

					// Cylinder Wall
					const wallGrad = ctx.createLinearGradient(
						sx - tierRadiusX,
						cyTier,
						sx + tierRadiusX,
						cyTier,
					);
					if (isDark) {
						wallGrad.addColorStop(0, "rgba(24, 24, 27, 0.95)");
						wallGrad.addColorStop(0.25, "rgba(39, 39, 42, 0.95)");
						wallGrad.addColorStop(
							0.5,
							isAct ? "rgba(16, 185, 129, 0.35)" : "rgba(39, 39, 42, 0.95)",
						);
						wallGrad.addColorStop(0.75, "rgba(24, 24, 27, 0.95)");
						wallGrad.addColorStop(1, "rgba(15, 15, 18, 0.95)");
					} else {
						wallGrad.addColorStop(0, "#e4e4e7");
						wallGrad.addColorStop(0.5, isAct ? "#a7f3d0" : "#ffffff");
						wallGrad.addColorStop(1, "#d4d4d8");
					}

					ctx.fillStyle = wallGrad;
					ctx.strokeStyle = isAct
						? "#10b981"
						: isDark
							? "rgba(255, 255, 255, 0.14)"
							: "rgba(0, 0, 0, 0.15)";
					ctx.lineWidth = isAct ? 1.8 : 1.2;

					ctx.beginPath();
					ctx.ellipse(
						sx,
						cyTier + tierHeight,
						tierRadiusX,
						tierRadiusY,
						0,
						0,
						Math.PI,
					);
					ctx.lineTo(sx - tierRadiusX, cyTier);
					ctx.ellipse(
						sx,
						cyTier,
						tierRadiusX,
						tierRadiusY,
						0,
						Math.PI,
						0,
						true,
					);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();

					// Micro telemetry activity ticks on cylinder sides
					const tickCount = 14;
					for (let k = 0; k < tickCount; k++) {
						const ang = Math.PI * 0.15 + (k / (tickCount - 1)) * Math.PI * 0.7;
						const tx = sx + Math.cos(ang) * tierRadiusX;
						const ty = cyTier + Math.sin(ang) * tierRadiusY + tierHeight * 0.5;
						const isLit = (frame + t * 4 + k) % 7 === 0;

						ctx.fillStyle = isLit
							? "#10b981"
							: isDark
								? "rgba(255, 255, 255, 0.15)"
								: "rgba(0, 0, 0, 0.12)";
						ctx.fillRect(tx - 1, ty - 2, 2, 4);
					}

					// Cylinder Top Cap
					const capGrad = ctx.createRadialGradient(
						sx,
						cyTier - tierRadiusY * 0.3,
						0,
						sx,
						cyTier,
						tierRadiusX,
					);
					if (isDark) {
						capGrad.addColorStop(0, isAct ? "#10b98144" : "#27272a");
						capGrad.addColorStop(1, "#18181b");
					} else {
						capGrad.addColorStop(0, isAct ? "#d1fae5" : "#ffffff");
						capGrad.addColorStop(1, "#f4f4f5");
					}

					ctx.fillStyle = capGrad;
					ctx.beginPath();
					ctx.ellipse(sx, cyTier, tierRadiusX, tierRadiusY, 0, 0, Math.PI * 2);
					ctx.fill();
					ctx.stroke();

					// Concentric track rings on top cap
					if (isTop) {
						ctx.strokeStyle = isAct
							? "rgba(16, 185, 129, 0.6)"
							: isDark
								? "rgba(255, 255, 255, 0.2)"
								: "rgba(0, 0, 0, 0.15)";
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.ellipse(
							sx,
							cyTier,
							tierRadiusX * 0.7,
							tierRadiusY * 0.7,
							0,
							0,
							Math.PI * 2,
						);
						ctx.stroke();

						ctx.beginPath();
						ctx.ellipse(
							sx,
							cyTier,
							tierRadiusX * 0.4,
							tierRadiusY * 0.4,
							0,
							0,
							Math.PI * 2,
						);
						ctx.stroke();

						// Glowing central emerald core LED
						const pulse = 0.7 + Math.sin(frame * 0.08) * 0.3;
						ctx.fillStyle = `rgba(16, 185, 129, ${pulse})`;
						ctx.beginPath();
						ctx.arc(sx, cyTier, 4 * scale, 0, Math.PI * 2);
						ctx.fill();

						ctx.fillStyle = "#ffffff";
						ctx.beginPath();
						ctx.arc(sx, cyTier, 1.8 * scale, 0, Math.PI * 2);
						ctx.fill();
					}
				}

				// 2. Draw FRONT-HALF of Orbit Ring and Front Satellites (sin >= 0) IN FRONT OF cylinders
				ctx.save();
				ctx.translate(sx, sy);
				ctx.rotate(orbitTilt);

				ctx.strokeStyle = isDark
					? "rgba(16, 185, 129, 0.28)"
					: "rgba(16, 185, 129, 0.35)";
				ctx.lineWidth = 1.2;
				ctx.setLineDash([3, 5]);
				ctx.beginPath();
				ctx.ellipse(0, 0, orbitRx, orbitRy, 0, 0, Math.PI);
				ctx.stroke();
				ctx.setLineDash([]);

				coreServices.forEach((srv) => {
					if (Math.sin(srv.angle) >= 0) {
						const ox = Math.cos(srv.angle) * orbitRx;
						const oy = Math.sin(srv.angle) * orbitRy;

						// Service pip with glow
						ctx.fillStyle = srv.color;
						ctx.beginPath();
						ctx.arc(ox, oy, 3.2, 0, Math.PI * 2);
						ctx.fill();

						// White photon core
						ctx.fillStyle = "#ffffff";
						ctx.beginPath();
						ctx.arc(ox, oy, 1.4, 0, Math.PI * 2);
						ctx.fill();
					}
				});

				ctx.restore();
			}

			// ---------------------------------------------------------------------
			// STATION 04: OFF-SITE BACKUP (3D Isometric Storage Safe / Vault)
			// ---------------------------------------------------------------------
			{
				const isAct = isHovered("backup") || activeStage === 3;
				const bx = backup.x;
				const by = backup.y;

				// Ambient cyan glow
				const bGrad = ctx.createRadialGradient(bx, by, 0, bx, by, 42);
				bGrad.addColorStop(
					0,
					isAct ? "rgba(6, 182, 212, 0.28)" : "rgba(6, 182, 212, 0.08)",
				);
				bGrad.addColorStop(1, "transparent");
				ctx.fillStyle = bGrad;
				ctx.beginPath();
				ctx.arc(bx, by, 42, 0, Math.PI * 2);
				ctx.fill();

				// 3D Isometric Storage Safe
				const bW = 32 * scale;
				const bH = 34 * scale;
				const isoAngle = Math.PI / 6;
				const cos = Math.cos(isoAngle);
				const sin = Math.sin(isoAngle);

				const topCenter = { x: bx, y: by - bH * 0.45 };
				const p1 = { x: topCenter.x, y: topCenter.y - bW * 0.45 * sin };
				const p2 = { x: topCenter.x + bW * 0.65 * cos, y: topCenter.y };
				const p3 = { x: topCenter.x, y: topCenter.y + bW * 0.45 * sin };
				const p4 = { x: topCenter.x - bW * 0.65 * cos, y: topCenter.y };

				// Top Face (S3 Bucket symbol)
				ctx.fillStyle = isDark ? "#27272a" : "#f4f4f5";
				ctx.strokeStyle = isAct ? "#06b6d4" : isDark ? "#3f3f46" : "#cbd5e1";
				ctx.lineWidth = isAct ? 1.8 : 1.2;
				ctx.beginPath();
				ctx.moveTo(p1.x, p1.y);
				ctx.lineTo(p2.x, p2.y);
				ctx.lineTo(p3.x, p3.y);
				ctx.lineTo(p4.x, p4.y);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();

				// Left Face (Front Vault Door with lock dial)
				const fBottom1 = { x: p4.x, y: p4.y + bH };
				const fBottom2 = { x: p3.x, y: p3.y + bH };

				ctx.fillStyle = isDark ? "#18181b" : "#e4e4e7";
				ctx.beginPath();
				ctx.moveTo(p4.x, p4.y);
				ctx.lineTo(p3.x, p3.y);
				ctx.lineTo(fBottom2.x, fBottom2.y);
				ctx.lineTo(fBottom1.x, fBottom1.y);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();

				// Right Face
				const rBottom = { x: p2.x, y: p2.y + bH };
				ctx.fillStyle = isDark ? "#101012" : "#d4d4d8";
				ctx.beginPath();
				ctx.moveTo(p3.x, p3.y);
				ctx.lineTo(p2.x, p2.y);
				ctx.lineTo(rBottom.x, rBottom.y);
				ctx.lineTo(fBottom2.x, fBottom2.y);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();

				// Safe Vault Dial / Lock on front
				const dialX = (p4.x + p3.x) / 2;
				const dialY = (p4.y + p3.y) / 2 + bH * 0.45;
				ctx.strokeStyle = isAct ? "#10b981" : "#06b6d4";
				ctx.lineWidth = 1.4;
				ctx.beginPath();
				ctx.arc(dialX, dialY, 5 * scale, 0, Math.PI * 2);
				ctx.stroke();

				// Vault lock center dot
				ctx.fillStyle = isAct ? "#10b981" : "#38bdf8";
				ctx.beginPath();
				ctx.arc(dialX, dialY, 1.8 * scale, 0, Math.PI * 2);
				ctx.fill();
			}

			// =====================================================================
			// 7. CAL.COM HUD BLUEPRINT BADGES WITH 90° ORTHOGONAL LEADER LINES
			// =====================================================================
			const drawHudBadge = (
				station: WorkflowStation,
				nodeX: number,
				nodeY: number,
				rawBadgeX: number,
				rawBadgeY: number,
				isActive: boolean,
			) => {
				const badgeW = Math.min(168, Math.max(136, Math.floor(width * 0.44)));
				const badgeH = 38;

				// Clamp badge position safely inside canvas boundaries
				const badgeX = Math.max(8, Math.min(width - badgeW - 8, rawBadgeX));
				const badgeY = Math.max(8, Math.min(height - badgeH - 42, rawBadgeY));

				// 90° Orthogonal Leader Line from 3D Node to HUD Badge
				ctx.strokeStyle = isActive
					? station.accentColor
					: isDark
						? "rgba(255, 255, 255, 0.16)"
						: "rgba(0, 0, 0, 0.14)";
				ctx.lineWidth = isActive ? 1.5 : 1;
				ctx.beginPath();
				ctx.moveTo(nodeX, nodeY);

				const targetX = badgeX > nodeX ? badgeX : badgeX + badgeW;
				const targetY = badgeY + badgeH / 2;
				const midX = (nodeX + targetX) / 2;

				ctx.lineTo(midX, nodeY);
				ctx.lineTo(midX, targetY);
				ctx.lineTo(targetX, targetY);
				ctx.stroke();

				// Anchor solder dot at 3D node
				ctx.fillStyle = isActive
					? station.accentColor
					: isDark
						? "#ffffff"
						: "#000000";
				ctx.beginPath();
				ctx.arc(nodeX, nodeY, 2.2, 0, Math.PI * 2);
				ctx.fill();

				// Badge Background Box (Cal.com sleek blueprint card)
				ctx.fillStyle = isDark
					? "rgba(16, 16, 16, 0.88)"
					: "rgba(255, 255, 255, 0.92)";
				ctx.strokeStyle = isActive
					? station.accentColor
					: isDark
						? "rgba(255, 255, 255, 0.14)"
						: "rgba(0, 0, 0, 0.12)";
				ctx.lineWidth = isActive ? 1.5 : 1;
				ctx.beginPath();
				ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 6);
				ctx.fill();
				ctx.stroke();

				// Status Indicator Dot with subtle pulse
				ctx.fillStyle = station.statusColor;
				ctx.beginPath();
				ctx.arc(badgeX + 12, badgeY + 14, 3, 0, Math.PI * 2);
				ctx.fill();

				// Badge Title
				ctx.fillStyle = isDark ? "#ffffff" : "#09090b";
				ctx.font =
					"bold 9.5px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
				ctx.fillText(station.badgeTitle, badgeX + 22, badgeY + 16);

				// Subtitle / Specs
				ctx.fillStyle = isDark ? "#a1a1aa" : "#71717a";
				ctx.font =
					"8px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
				ctx.fillText(station.subtitle, badgeX + 10, badgeY + 28);
			};

			// Render HUD Badges for all 4 stations without overlap or clipping:
			// 01: VPS (Positioned above-left of server, safe within bounds)
			drawHudBadge(
				stations[0],
				vps.x,
				vps.y,
				Math.max(14, vps.x - 145),
				vps.y - 65,
				isHovered("vps") || activeStage === 0,
			);

			// 02: Secret Forge (Positioned top-right of cryptographic vault)
			drawHudBadge(
				stations[1],
				forge.x,
				forge.y,
				Math.min(width - 182, forge.x + 35),
				forge.y - 40,
				isHovered("forge") || activeStage === 1,
			);

			// 03: Supabase Core Stack (Positioned top-right above cylinders)
			drawHudBadge(
				stations[2],
				stack.x,
				stack.y,
				Math.min(width - 182, stack.x + 65),
				stack.y - 85,
				isHovered("stack") || activeStage === 2,
			);

			// 04: Off-site Backup (Positioned bottom-left of backup vault)
			drawHudBadge(
				stations[3],
				backup.x,
				backup.y,
				Math.max(14, backup.x - 180),
				backup.y + 20,
				isHovered("backup") || activeStage === 3,
			);

			animationFrameId = requestAnimationFrame(render);
		};

		animationFrameId = requestAnimationFrame(render);

		return () => {
			isDestroyed = true;
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("resize", handleResize);
			canvas.removeEventListener("mousemove", onMouseMove);
			canvas.removeEventListener("mouseleave", onMouseLeave);
			canvas.removeEventListener("click", onClick);
			canvas.removeEventListener("touchstart", onTouchStart);
		};
	}, [isDark, stations]);

	// Currently inspected station (shows only on click / selection)
	const activeStation = useMemo(() => {
		if (!selectedStationId) return null;
		return stations.find((s) => s.id === selectedStationId) || null;
	}, [selectedStationId, stations]);

	return (
		<div className={styles.container} ref={containerRef}>
			{/* Subtle ambient light glow */}
			<div className={styles.ambientGlow} />

			{/* Canvas Surface */}
			<div className={styles.canvasWrapper}>
				<canvas ref={canvasRef} className={styles.canvas} />
			</div>

			{/* Floating Node Inspector Card (Cal.com Blueprint popup on hover/click) */}
			{activeStation && (
				<div
					className={`${styles.nodeInspector} ${
						activeStation.id === "vps"
							? styles.inspectorVps
							: activeStation.id === "stack"
								? styles.inspectorStack
								: activeStation.id === "forge"
									? styles.inspectorForge
									: styles.inspectorBackup
					}`}
				>
					<div className={styles.inspectorHeader}>
						<div className={styles.inspectorTitle}>
							<span>{activeStation.name}</span>
						</div>
						<div className={styles.inspectorControls}>
							<span
								className={styles.inspectorStatus}
								style={{
									color: activeStation.statusColor,
									backgroundColor: `${activeStation.statusColor}18`,
								}}
							>
								{activeStation.status}
							</span>
							<button
								type="button"
								className={styles.inspectorCloseBtn}
								onClick={(e) => {
									e.stopPropagation();
									setSelectedStationId(null);
									setHoveredStationId(null);
								}}
								aria-label={i18n._("Close inspector")}
							>
								×
							</button>
						</div>
					</div>
					<div className={styles.inspectorDesc}>
						{activeStation.description}
					</div>
					<div className={styles.inspectorSpecList}>
						{activeStation.specs.map((spec) => (
							<div key={spec} className={styles.inspectorSpecItem}>
								{spec}
							</div>
						))}
					</div>
				</div>
			)}

			{/* Floating Telemetry Command Pill at Bottom */}
			<button
				type="button"
				className={styles.telemetryPill}
				onClick={handleSimulateDeploy}
				title={i18n._("Click to simulate full deployment workflow")}
			>
				<span className={styles.pillDot} />
				<span className={styles.pillTag}>{logs[currentLogIndex].tag}</span>
				<span className={styles.pillText}>{logs[currentLogIndex].text}</span>
				<span className={styles.pillAction}>
					{simulating ? i18n._("Simulating...") : i18n._("Simulate")}
				</span>
			</button>
		</div>
	);
}
