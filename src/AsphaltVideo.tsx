import {
  AbsoluteFill,
  Sequence,
  Video,
  Img,
  Audio,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

/* -------------------------
   PALETA DE COLORES ASPHALT
--------------------------*/
const COLORS = {
  dark: "#131A26",
  primary: "#0B2145",
  accent: "#142239",
  light: "#1A55B7",
  success: "#22c55e",
  danger: "#ef4444",
  warning: "#f59e0b",
};

/* -------------------------
   LOGO ACM - WATERMARK
--------------------------*/
const Watermark = () => {
  return (
    <Img
      src={staticFile("LogoWMonograma.png")}
      style={{
        position: "absolute",
        bottom: 120,
        right: 160,
        width: 90,
        opacity: 0.05,
        filter: "grayscale(100%)",
        zIndex: 100,
      }}
    />
  );
};


/* -------------------------
   ICONOS SVG PROFESIONALES
--------------------------*/
const Icons = {
  Warning: ({ size = 24, color = COLORS.warning }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L2 20h20L12 2z"
        stroke={color}
        strokeWidth="2"
        fill={`${color}33`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 9v4m0 4h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  Danger: ({ size = 24, color = COLORS.danger }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill={`${color}33`} />
      <path d="M12 8v4m0 4h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  Road: ({ size = 24, color = "#fff" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 8h18M3 16h18M12 4v16M8 4v16M16 4v16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <rect x="10" y="10" width="4" height="2" fill={color} />
      <rect x="10" y="14" width="4" height="2" fill={color} />
    </svg>
  ),

  Lightning: ({ size = 24, color = "#fff" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Money: ({ size = 24, color = "#fff" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
      <path
        d="M12 6v12M9 9h6a1.5 1.5 0 0 1 0 3h-6a1.5 1.5 0 0 0 0 3h6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  Check: ({ size = 24, color = "#fff" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Alert: ({ size = 24, color = "#fff" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <path d="M8 8l8 8M16 8l-8 8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  Car: ({ size = 32, color = COLORS.light }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M6 16l2-6h16l2 6v8h-4v2h-2v-2h-8v2h-2v-2H6v-8z"
        fill={color}
        stroke="#fff"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="20" r="2" fill="#fff" />
      <circle cx="22" cy="20" r="2" fill="#fff" />
      <path d="M10 10h12l1.5 4H8.5L10 10z" fill={`${color}dd`} />
    </svg>
  ),

  Location: ({ size = 24, color = "#fff" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="12" cy="9" r="2.5" fill={COLORS.dark} />
    </svg>
  ),
};

/* -------------------------
   COMPONENTES AUXILIARES
--------------------------*/

// Efecto de partículas/puntos en movimiento
const ParticlesBackground = ({ color = COLORS.light, density = 20 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles = Array.from({ length: density }, (_, i) => ({
    x: (i * 73) % width,
    y: (i * 127) % height,
    speed: 0.5 + (i % 3) * 0.3,
    size: 2 + (i % 3),
  }));

  return (
    <AbsoluteFill>
      {particles.map((p, i) => {
        const y = (p.y + frame * p.speed) % height;
        const opacity = interpolate(Math.abs(y - height / 2), [0, height / 2], [0.6, 0.1]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity,
              boxShadow: `0 0 ${p.size * 2}px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Líneas de velocidad animadas
const SpeedLines = () => {
  const frame = useCurrentFrame();
  const lines = Array.from({ length: 8 }, (_, i) => i);

  return (
    <AbsoluteFill>
      {lines.map((i) => {
        const x = interpolate(frame, [0, 60], [-200, 2000], {
          extrapolateRight: "wrap",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + i * 150,
              top: 100 + i * 80,
              width: 120,
              height: 2,
              backgroundColor: COLORS.light,
              opacity: 0.3,
              transform: "rotate(-5deg)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Efecto de escaneo HUD
const ScanLines = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: 3,
          background: `linear-gradient(90deg, transparent, ${COLORS.light}, transparent)`,
          top: (frame * 8) % height,
          opacity: 0.3,
          boxShadow: `0 0 20px ${COLORS.light}`,
        }}
      />
    </AbsoluteFill>
  );
};

/* -------------------------
   MAPA SMART CITY MEJORADO
--------------------------*/
const SmartCityMap = () => {
  const frame = useCurrentFrame();

  // Grid de calles
  const streets = {
    horizontal: [150, 300, 450, 600, 750],
    vertical: [200, 400, 600, 800, 1000, 1200],
  };

  // Puntos de interés / alertas
  const alerts = [
    { x: 500, y: 320, type: "danger", label: "Bache profundo", severity: "high" },
    { x: 750, y: 480, type: "warning", label: "Terreno irregular", severity: "medium" },
    { x: 350, y: 580, type: "danger", label: "Calle dañada", severity: "high" },
  ];

  // Ruta animada del vehículo
  const routeProgress = interpolate(frame, [20, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  const route = [
    { x: 200, y: 150 },
    { x: 400, y: 150 },
    { x: 400, y: 300 },
    { x: 600, y: 300 },
    { x: 600, y: 450 },
    { x: 800, y: 450 },
    { x: 800, y: 600 },
    { x: 1000, y: 600 },
  ];

  // Calcular posición actual del vehículo - CORREGIDO
  const totalSegments = route.length - 1;
  const currentSegment = Math.min(
    Math.floor(routeProgress * totalSegments),
    totalSegments - 1
  );
  const segmentProgress = (routeProgress * totalSegments) % 1;

  let vehicleX = route[route.length - 1].x;
  let vehicleY = route[route.length - 1].y;
  let vehicleAngle = 0;

  if (currentSegment < totalSegments && route[currentSegment] && route[currentSegment + 1]) {
    const start = route[currentSegment];
    const end = route[currentSegment + 1];
    vehicleX = start.x + (end.x - start.x) * segmentProgress;
    vehicleY = start.y + (end.y - start.y) * segmentProgress;

    // Calcular ángulo de dirección
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    vehicleAngle = Math.atan2(dy, dx) * (180 / Math.PI);
  }

  // Animación de pulso para las alertas
  const alertPulse = Math.sin(frame * 0.15) * 0.3 + 0.7;

  // Opacidad del grid
  const gridOpacity = interpolate(frame, [0, 20], [0, 0.3]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.dark} 0%, ${COLORS.primary} 50%, ${COLORS.dark} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Fondo de grid estilo smart city */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: gridOpacity,
        }}
      >
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke={COLORS.light}
              strokeWidth="0.5"
              opacity="0.2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <ScanLines />

      {/* Container del mapa */}
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 800,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Calles horizontales */}
        {streets.horizontal.map((y, i) => {
          const streetWidth = interpolate(frame, [5 + i * 3, 25 + i * 3], [0, 1200]);
          return (
            <div
              key={`h-${i}`}
              style={{
                position: "absolute",
                left: 0,
                top: y,
                width: streetWidth,
                height: 14,
                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.primary})`,
                borderRadius: 4,
                boxShadow: `0 0 10px ${COLORS.light}40`,
              }}
            />
          );
        })}

        {/* Calles verticales */}
        {streets.vertical.map((x, i) => {
          const streetHeight = interpolate(frame, [8 + i * 3, 28 + i * 3], [0, 800]);
          return (
            <div
              key={`v-${i}`}
              style={{
                position: "absolute",
                left: x,
                top: 0,
                width: 14,
                height: streetHeight,
                background: `linear-gradient(180deg, ${COLORS.accent}, ${COLORS.primary})`,
                borderRadius: 4,
                boxShadow: `0 0 10px ${COLORS.light}40`,
              }}
            />
          );
        })}

        {/* Ruta trazada */}
        <svg
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <path
            d={route.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")}
            fill="none"
            stroke={COLORS.light}
            strokeWidth="8"
            strokeDasharray="8,5"
            strokeDashoffset={interpolate(frame, [0, 60], [0, -100], {
              extrapolateRight: "wrap",
            })}
            opacity={interpolate(frame, [15, 30], [0, 0.6])}
            style={{
              filter: `drop-shadow(0 0 8px ${COLORS.light})`,
            }}
          />
        </svg>

        {/* Alertas de problemas */}
        {alerts.map((alert, i) => {
          const delay = 30 + i * 10;
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1]);
          const scale = spring({
            frame: frame - delay,
            fps: 30,
            config: { damping: 100 },
          });

          const color = alert.type === "danger" ? COLORS.danger : COLORS.warning;

          return (
            <div key={i}>
              {/* Círculo de alerta pulsante */}
              <div
                style={{
                  position: "absolute",
                  left: alert.x,
                  top: alert.y,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  opacity,
                }}
              >
                {/* Ondas de pulso */}
                {[1, 2].map((wave) => (
                  <div
                    key={wave}
                    style={{
                      position: "absolute",
                      width: 100 * wave,
                      height: 100 * wave,
                      borderRadius: "50%",
                      border: `2px solid ${color}`,
                      transform: "translate(-50%, -50%)",
                      left: "50%",
                      top: "50%",
                      opacity: alertPulse / wave,
                      animation: `pulse ${2 * wave}s infinite`,
                    }}
                  />
                ))}

                {/* Icono central */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 20px ${color}, 0 0 40px ${color}80`,
                  }}
                >
                  {alert.type === "danger" ? (
                    <Icons.Danger size={24} color="#fff" />
                  ) : (
                    <Icons.Warning size={24} color="#fff" />
                  )}
                </div>

                {/* Etiqueta */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 50,
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                    background: `${COLORS.dark}F2`,
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: `1px solid ${color}`,
                    color: "white",
                    fontSize: 22,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    boxShadow: `0 4px 12px ${color}40`,
                  }}
                >
                  {alert.label}
                </div>
              </div>
            </div>
          );
        })}

        {/* Vehículo animado */}
        <div
          style={{
            position: "absolute",
            left: vehicleX,
            top: vehicleY,
            transform: `translate(-50%, -50%) rotate(${vehicleAngle}deg)`,
            opacity: interpolate(frame, [20, 35], [0, 1]),
            transition: "all 0.1s ease-out",
          }}
        >
          {/* Sombra del vehículo */}
          <div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS.light}40, transparent)`,
              filter: "blur(8px)",
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
            }}
          />

          {/* Icono del vehículo */}
          <div
            style={{
              position: "relative",
              filter: `drop-shadow(0 0 12px ${COLORS.light})`,
            }}
          >
            <Icons.Car size={66} color={COLORS.light} />
          </div>
        </div>
      </div>

      {/* HUD Overlay */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          background: `${COLORS.dark}E6`,
          backdropFilter: "blur(10px)",
          padding: "40px 50px",
          borderRadius: 12,
          border: `1px solid ${COLORS.light}60`,
          boxShadow: `0 8px 32px ${COLORS.dark}80`,
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#94a3b8",
            marginBottom: 8,
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Sistema de Detección
        </div>
        <div
          style={{
            color: "white",
            fontSize: 42,
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          {alerts.length} Alertas Activas
        </div>
      </div>

      {/* Stats panel */}
      <div
        style={{
          position: "absolute",
          bottom: 700,
          right: 180,
          display: "flex",
          gap: 20,
        }}
      >
        {[
          { label: "Precisión", value: "97.5%", color: COLORS.success },
          { label: "Usuarios", value: "15.2K", color: COLORS.light },
          { label: "Reportes", value: "847", color: COLORS.warning },
        ].map((stat, i) => {
          const statOpacity = interpolate(frame, [40 + i * 8, 55 + i * 8], [0, 1]);

          return (
            <div
              key={i}
              style={{
                background: `${COLORS.dark}E6`,
                backdropFilter: "blur(10px)",
                padding: "20px 30px",
                borderRadius: 10,
                border: `1px solid ${stat.color}60`,
                opacity: statOpacity,
                minWidth: 120,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  color: "#94a3b8",
                  marginBottom: 5,
                  fontFamily: "'Inter', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  color: stat.color,
                  fontSize: 28,
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                }}
              >
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* -------------------------
   ESCENA 1 – INTRO
--------------------------*/
const EscenaIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 80, stiffness: 100 },
  });

  const textOpacity = interpolate(frame, [20, 40], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.dark} 0%, ${COLORS.primary} 50%, ${COLORS.dark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ParticlesBackground color={COLORS.light} density={25} />

      {/* Círculos decorativos */}
      {[1, 2, 3].map((i) => {
        const scale = interpolate(frame, [0, 60], [1, 1 + i * 0.2], {
          extrapolateRight: "wrap",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 300 + i * 100,
              height: 300 + i * 100,
              borderRadius: "50%",
              border: `2px solid ${COLORS.light}${Math.floor(15 / i)}`,
              transform: `scale(${scale})`,
            }}
          />
        );
      })}

      <div style={{ textAlign: "center", zIndex: 10 }}>
        <div
          style={{
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 20px 60px ${COLORS.light}99)`,
            marginBottom: 0,
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{
              width: 200,
            }}
          />
        </div>

        <div
          style={{
            opacity: textOpacity,
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "4px",
              background: `linear-gradient(90deg, #fff, ${COLORS.light}, #fff)`,
              backgroundSize: "200% 100%",
              backgroundPosition: `${-frame * 2}% 0`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ASPHALT
          </h1>
          <p
            style={{
              fontSize: 24,
              fontFamily: "'Inter', sans-serif",
              color: "#94a3b8",
              margin: "15px 0 0 0",
              fontWeight: 300,
              letterSpacing: "3px",
            }}
          >
            MOBILE CROWD SENSING
          </p>

          <div
            style={{
              width: 150,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${COLORS.light}, transparent)`,
              margin: "30px auto",
            }}
          />

          <p
            style={{
              fontSize: 18,
              fontFamily: "'Inter', sans-serif",
              color: COLORS.light,
              margin: "20px 0 0 0",
              maxWidth: 500,
            }}
          >
            Detección colaborativa de baches en tiempo real
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* -------------------------
   ESCENA 2 – ESTADÍSTICAS IMPACTANTES
--------------------------*/
const EscenaEstadisticas = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1]);
  // Eliminado: const titleY = interpolate(frame, [0, 20], [50, 0]);

  const stats = [
    { value: "93.6%", label: "Problema vial prioritario", delay: 25 },
    { value: "15–20%", label: "Llantas dañadas por baches", delay: 40 },
    { value: "$5k – $20k MXN", label: "Costo real al conductor", delay: 55 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.dark} 0%, ${COLORS.primary} 50%, ${COLORS.dark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ParticlesBackground color={COLORS.danger} density={15} />
      <ScanLines />

      {/* Título principal */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: `translate(-50%, 0)`,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            color: "white",
            letterSpacing: "2px",
            marginBottom: 15,
          }}
        >
          EL COSTO DE IGNORAR EL CAMINO
        </div>
        <div
          style={{
            width: 300,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${COLORS.danger}, transparent)`,
            margin: "0 auto",
          }}
        />
      </div>

      {/* Estadísticas */}
      <div
        style={{
          display: "flex",
          gap: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {stats.map((stat, i) => {
          const statOpacity = interpolate(frame, [stat.delay, stat.delay + 20], [0, 1]);
          const statScale = spring({
            frame: frame - stat.delay,
            fps,
            config: { damping: 100 },
          });

          return (
            <div
              key={i}
              style={{
                opacity: statOpacity,
                transform: `scale(${statScale})`,
                textAlign: "center",
                background: `${COLORS.accent}CC`,
                backdropFilter: "blur(15px)",
                padding: "30px 20px",
                borderRadius: 20,
                border: `2px solid ${COLORS.danger}80`,
                boxShadow: `0 10px 40px ${COLORS.danger}40`,
                minWidth: 200,
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  color: COLORS.danger,
                  marginBottom: 15,
                  textShadow: `0 0 30px ${COLORS.danger}99`,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontFamily: "'Inter', sans-serif",
                  color: "#94a3b8",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* -------------------------
   ESCENA 3 – SIN APP
--------------------------*/
const EscenaSinApp = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelSlide = interpolate(frame, [0, 30], [-300, 0], {
    extrapolateRight: "clamp",
  });

  const labelScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 200 },
  });

  const shakeIntensity = interpolate(frame, [40, 60], [0, 5], {
    extrapolateRight: "clamp",
  });

  const shakeX = Math.sin(frame * 0.5) * shakeIntensity;
  const shakeY = Math.cos(frame * 0.7) * shakeIntensity;

  return (
    <AbsoluteFill>
      <Video
        src={staticFile("escenarioA.mp4")}
        style={{
          transform: `translate(${shakeX}px, ${shakeY}px)`,
          filter: "brightness(0.6) saturate(0.7)",
        }}
      />

      <AbsoluteFill
        style={{
          background: `radial-gradient(circle, transparent 40%, ${COLORS.danger}20 100%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          transform: `translateX(${labelSlide}px) scale(${labelScale})`,
          background: `linear-gradient(135deg, ${COLORS.danger}F2, #dc2626F2)`,
          padding: "20px 40px",
          borderRadius: 15,
          color: "white",
          fontSize: 36,
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          letterSpacing: "1px",
          boxShadow: `0 10px 40px ${COLORS.danger}99, 0 0 0 3px rgba(255,255,255,0.2)`,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <Icons.Alert size={32} color="#fff" />
        SIN ASPHALT
      </div>

      {[
        { text: "Baches no detectados", delay: 30 },
        { text: "Daños al vehículo", delay: 50 },
        { text: "Gastos inesperados", delay: 70 },
      ].map((item, i) => {
        const problemOpacity = interpolate(frame, [item.delay, item.delay + 20], [0, 1]);
        const slideX = interpolate(frame, [item.delay, item.delay + 25], [50, 0]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              right: 80,
              top: 120 + i * 90,
              opacity: problemOpacity,
              transform: `translateX(${slideX}px)`,
              background: `${COLORS.danger}33`,
              backdropFilter: "blur(10px)",
              padding: "15px 25px",
              borderRadius: 12,
              border: `2px solid ${COLORS.danger}66`,
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Icons.Alert size={28} color={COLORS.danger} />
            <span
              style={{
                color: "white",
                fontSize: 24,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
              }}
            >
              {item.text}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* -------------------------
   ESCENA 4 – MAPA
--------------------------*/
const EscenaMapa = () => {
  const frame = useCurrentFrame();

  return (
    <div>
      <SmartCityMap />

      {/* Título principal */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: "80%",
          transform: "translateX(-50%)",
          opacity: interpolate(frame, [0, 25], [0, 1]),
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: `${COLORS.dark}F2`,
            backdropFilter: "blur(15px)",
            padding: "20px 60px",
            borderRadius: 15,
            border: `2px solid ${COLORS.success}80`,
            boxShadow: `0 10px 40px ${COLORS.success}60`,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              color: COLORS.success,
              letterSpacing: "3px",
              textShadow: `0 0 20px ${COLORS.success}99`,
            }}
          >
            LA SOLUCIÓN
          </div>
        </div>
      </div>

      {/* Texto overlay inferior */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: interpolate(frame, [60, 75], [0, 1]),
        }}
      >
        <div
          style={{
            background: `${COLORS.dark}F2`,
            backdropFilter: "blur(15px)",
            padding: "30px 50px",
            borderRadius: 20,
            border: `2px solid ${COLORS.light}80`,
            boxShadow: `0 10px 40px ${COLORS.light}40`,
          }}
        >
          <div
            style={{
              fontSize: 30,
              color: "#94a3b8",
              marginBottom: 10,
              fontFamily: "'Inter', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Icons.Location size={38} color={COLORS.light} />
            DETECCIÓN EN TIEMPO REAL
          </div>
          <div
            style={{
              color: "white",
              fontSize: 50,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Red colaborativa activa
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------
   ESCENA 5 – CON ASPHALT
--------------------------*/
const EscenaConApp = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelSlide = interpolate(frame, [0, 30], [-300, 0], {
    extrapolateRight: "clamp",
  });

  const labelScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 200 },
  });

  const successGlow = Math.sin(frame * 0.1) * 0.3 + 0.7;

  return (
    <AbsoluteFill>
      <Video src={staticFile("escenarioB.mp4")} style={{ filter: "brightness(0.8)" }} />

      <AbsoluteFill
        style={{
          background: `radial-gradient(circle, transparent 40%, ${COLORS.success}10 100%)`,
        }}
      />

      <SpeedLines />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          transform: `translateX(${labelSlide}px) scale(${labelScale})`,
          background: `linear-gradient(135deg, ${COLORS.success}F2, #16a34aF2)`,
          padding: "20px 40px",
          borderRadius: 15,
          color: "white",
          fontSize: 36,
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          letterSpacing: "1px",
          boxShadow: `0 10px 40px ${COLORS.success}${Math.floor(
            successGlow * 100
          )}, 0 0 0 3px rgba(255,255,255,0.2)`,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <Icons.Check size={32} color="#fff" />
        CON ASPHALT
      </div>

      {[
        { icon: <Icons.Road size={32} color="#fff" />, text: "Ruta optimizada", delay: 20 },
        {
          icon: <Icons.Lightning size={32} color="#fff" />,
          text: "Alertas en tiempo real",
          delay: 35,
        },
        {
          icon: <Icons.Money size={32} color="#fff" />,
          text: "Ahorro garantizado",
          delay: 50,
        },
      ].map((item, i) => {
        const benefitOpacity = interpolate(frame, [item.delay, item.delay + 20], [0, 1]);
        const slideX = interpolate(frame, [item.delay, item.delay + 25], [50, 0]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              right: 80,
              top: 120 + i * 90,
              opacity: benefitOpacity,
              transform: `translateX(${slideX}px)`,
              background: `${COLORS.success}33`,
              backdropFilter: "blur(10px)",
              padding: "15px 25px",
              borderRadius: 12,
              border: `2px solid ${COLORS.success}66`,
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            {item.icon}
            <span
              style={{
                color: "white",
                fontSize: 24,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
              }}
            >
              {item.text}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* -------------------------
   ESCENA 6 – CIERRE
--------------------------*/
const EscenaCierre = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame: frame - 10,
    fps,
    from: 0,
    to: 1,
    config: { damping: 80, stiffness: 100 },
  });

  const textSlide = interpolate(frame, [20, 50], [100, 0], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const rotate = Math.sin(frame * 0.02) * 2;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.dark} 0%, ${COLORS.primary} 50%, ${COLORS.dark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ParticlesBackground color={COLORS.light} density={30} />

      {[1, 2, 3].map((i) => {
        const scale = interpolate(frame, [0, 60], [1, 1 + i * 0.3], {
          extrapolateRight: "wrap",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 400 + i * 100,
              height: 400 + i * 100,
              borderRadius: "50%",
              border: `2px solid ${COLORS.light}${Math.floor(10 / i)}`,
              transform: `scale(${scale})`,
              opacity: opacity * 0.3,
            }}
          />
        );
      })}

      <div style={{ textAlign: "center", zIndex: 10 }}>
        <div
          style={{
            transform: `scale(${logoScale}) rotate(${rotate}deg)`,
            filter: `drop-shadow(0 20px 60px ${COLORS.light}99)`,
            marginBottom: 30,
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{
              width: 220,
              opacity,
            }}
          />
        </div>

        <div
          style={{
            transform: `translateY(${textSlide}px)`,
            opacity,
          }}
        >
          <p
            style={{
              fontSize: 56,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "3px",
              background: `linear-gradient(90deg, #fff, ${COLORS.light}, #fff)`,
              backgroundSize: "200% 100%",
              backgroundPosition: `${-frame * 2}% 0`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ASPHALT
          </p>
          <p
            style={{
              fontSize: 28,
              fontFamily: "'Inter', sans-serif",
              color: "#94a3b8",
              margin: "10px 0 0 0",
              fontWeight: 300,
              letterSpacing: "2px",
            }}
          >
            Conduce informado, conduce seguro
          </p>

          <div
            style={{
              width: 200,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${COLORS.light}, transparent)`,
              margin: "30px auto",
            }}
          />

          <div
            style={{
              marginTop: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              fontSize: 20,
              color: COLORS.light,
              fontFamily: "'Inter', sans-serif",
              opacity: interpolate(frame, [50, 70], [0, 1]),
            }}
          >
            <div
              style={{
                padding: "12px 30px",
                background: `${COLORS.light}20`,
                border: `2px solid ${COLORS.light}`,
                borderRadius: 25,
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              Muy Pronto
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* -------------------------
   VIDEO FINAL
--------------------------*/
export const AsphaltVideo = () => {
  return (
    <AbsoluteFill>
      < Watermark />
      
      {/* Música de fondo - Fuera de Sequences para que funcione todo el video */}
      <Sequence from={0} durationInFrames={571}>
        <Audio src={staticFile("sounds/background-music.mp3")} volume={0.5} />
        
      </Sequence>

      {/* Escena 1: Intro - 90 frames */}
      <Sequence from={0} durationInFrames={90}>
        <EscenaIntro />
        {/* <Audio src={staticFile("sounds/intro-whoosh.mp3")} volume={0.2} />*/}
      </Sequence>

      {/* Escena 2: Estadísticas impactantes - 120 frames */}
      <Sequence from={90} durationInFrames={120}>
        <EscenaEstadisticas />
        <Audio src={staticFile("sounds/alert-beep.mp3")} startFrom={25} volume={0.6} />
        <Audio src={staticFile("sounds/alert-beep.mp3")} startFrom={40} volume={0.6} />
        <Audio src={staticFile("sounds/alert-beep.mp3")} startFrom={55} volume={0.6} />
      </Sequence>

      {/* Escena 3: Sin App - 90 frames */}
      <Sequence from={210} durationInFrames={90}>
        <EscenaSinApp />
        <Audio src={staticFile("sounds/warning-sound.mp3")} volume={0.2} />
        <Audio src={staticFile("sounds/car-bump.mp3")} startFrom={60} volume={0.7} />
      </Sequence>

      {/* Escena 4: Mapa - 180 frames */}
      <Sequence from={300} durationInFrames={180}>
        <EscenaMapa />
        <Audio src={staticFile("sounds/tech-scan.mp3")} volume={0.4} />
        <Audio src={staticFile("sounds/radar-beep.mp3")} startFrom={30} volume={0.5} />
        <Audio src={staticFile("sounds/radar-beep.mp3")} startFrom={40} volume={0.5} />
        <Audio src={staticFile("sounds/radar-beep.mp3")} startFrom={50} volume={0.5} />
      </Sequence>

      {/* Escena 5: Con App - 90 frames */}
      <Sequence from={480} durationInFrames={90}>
        <EscenaConApp />
        <Audio src={staticFile("sounds/success-chime.mp3")} volume={0.6} />
        <Audio src={staticFile("sounds/notification-pop.mp3")} startFrom={20} volume={0.5} />
        <Audio src={staticFile("sounds/notification-pop.mp3")} startFrom={35} volume={0.5} />
        <Audio src={staticFile("sounds/notification-pop.mp3")} startFrom={50} volume={0.5} />
      </Sequence>

      {/* Escena 6: Cierre - 120 frames */}
      <Sequence from={570} durationInFrames={120}>
        <EscenaCierre />
        <Audio src={staticFile("sounds/final-whoosh.mp3")} volume={0.7} />
      </Sequence>
    </AbsoluteFill>
  );
};