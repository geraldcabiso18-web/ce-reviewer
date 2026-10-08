// QUESTION BANK — add your own questions by copying a block.
// "answer" is the position of the correct choice, starting at 0 (0 = first, 1 = second...).
const SUBJECTS = [
  { id: "math", name: "Mathematics", questions: [
    { q: "What is the derivative of x³ evaluated at x = 2?", choices: ["6", "8", "12", "16"], answer: 2,
      explanation: "d/dx(x³) = 3x². At x = 2: 3(4) = 12." },
    { q: "What is the sum of the interior angles of a hexagon?", choices: ["540°", "720°", "900°", "1080°"], answer: 1,
      explanation: "Sum = (n − 2)(180°) = (6 − 2)(180°) = 720°." },
    { q: "Evaluate log₂ 32.", choices: ["4", "5", "6", "16"], answer: 1,
      explanation: "2⁵ = 32, so log₂ 32 = 5." },
    { q: "Evaluate the integral of 2x dx from x = 0 to x = 3.", choices: ["6", "9", "12", "18"], answer: 1,
      explanation: "∫2x dx = x². From 0 to 3: 3² − 0² = 9." },
    { q: "What is sin 30°?", choices: ["0.5", "0.707", "0.866", "1"], answer: 0,
      explanation: "sin 30° = 1/2 = 0.5 (from the 30-60-90 triangle)." }
  ]},
  { id: "mechanics", name: "Engineering Mechanics", questions: [
    { q: "Two perpendicular forces of 30 N and 40 N act on a point. What is the resultant?", choices: ["35 N", "50 N", "70 N", "10 N"], answer: 1,
      explanation: "R = √(30² + 40²) = √2500 = 50 N." },
    { q: "A 10 N force acts perpendicular to a 2 m lever arm. What is the moment?", choices: ["5 N·m", "12 N·m", "20 N·m", "8 N·m"], answer: 2,
      explanation: "M = F × d = 10 × 2 = 20 N·m." },
    { q: "A 100 N block is about to slide when a 30 N horizontal force is applied. What is the coefficient of static friction?", choices: ["0.03", "0.30", "3.0", "0.70"], answer: 1,
      explanation: "μ = F / N = 30 / 100 = 0.30 (on a horizontal surface, N equals the weight)." },
    { q: "How far is the centroid of a triangle from its base?", choices: ["h/2", "h/3", "h/4", "2h/3"], answer: 1,
      explanation: "The centroid of a triangle is h/3 above the base (or 2h/3 from the apex)." },
    { q: "Which set describes static equilibrium of a coplanar force system?", choices: ["ΣFx = 0, ΣFy = 0, ΣM = 0", "ΣFx = 0 only", "ΣM = 0 only", "ΣF = ma"], answer: 0,
      explanation: "For a body at rest in a plane, the sums of horizontal forces, vertical forces, and moments must all be zero." }
  ]},
  { id: "strength", name: "Strength of Materials", questions: [
    { q: "A 20 kN axial load acts on a bar with a 100 mm² cross-section. What is the normal stress?", choices: ["2 MPa", "20 MPa", "200 MPa", "2000 MPa"], answer: 2,
      explanation: "σ = P/A = 20,000 N / 100 mm² = 200 N/mm² = 200 MPa." },
    { q: "Hooke's Law states that, within the elastic limit, stress is…", choices: ["inversely proportional to strain", "proportional to strain", "equal to strain squared", "independent of strain"], answer: 1,
      explanation: "σ = Eε: stress is directly proportional to strain, with E as the constant." },
    { q: "For most engineering materials, Poisson's ratio lies between…", choices: ["0 and 0.5", "0.5 and 1", "1 and 2", "−1 and 0"], answer: 0,
      explanation: "Typical values are about 0.25–0.35 for metals; the theoretical upper limit for isotropic materials is 0.5." },
    { q: "Which formula gives the flexural (bending) stress in a beam?", choices: ["σ = P/A", "σ = Mc/I", "σ = Tr/J", "σ = VQ/Ib"], answer: 1,
      explanation: "Flexure formula: σ = Mc/I. P/A is axial, Tr/J is torsion, VQ/Ib is shear." },
    { q: "What is the maximum deflection of a simply supported beam with a central point load P?", choices: ["PL³/48EI", "PL³/3EI", "5wL⁴/384EI", "PL³/8EI"], answer: 0,
      explanation: "For a central point load on a simple span, δmax = PL³/(48EI)." }
  ]},
  { id: "hydraulics", name: "Hydraulics", questions: [
    { q: "What is the gage pressure at a depth of 10 m in fresh water?", choices: ["9.81 kPa", "49.05 kPa", "98.1 kPa", "981 kPa"], answer: 2,
      explanation: "p = γh = 9.81 kN/m³ × 10 m = 98.1 kPa." },
    { q: "Which equation expresses the continuity of incompressible flow?", choices: ["A₁V₁ = A₂V₂", "p₁ = p₂", "V₁ + V₂ = 0", "A₁/V₁ = A₂/V₂"], answer: 0,
      explanation: "Flow rate Q = AV stays constant along a pipe, so A₁V₁ = A₂V₂." },
    { q: "Bernoulli's equation is based on the principle of conservation of…", choices: ["mass", "energy", "momentum", "charge"], answer: 1,
      explanation: "It states that pressure head + velocity head + elevation head stays constant along a streamline (ideal flow)." },
    { q: "Flow in a pipe is generally laminar when the Reynolds number is below about…", choices: ["200", "2,000", "20,000", "200,000"], answer: 1,
      explanation: "Re < 2000 is laminar, 2000–4000 is transitional, and above 4000 is turbulent." },
    { q: "What is the specific gravity of water at 4°C?", choices: ["0", "1", "9.81", "1000"], answer: 1,
      explanation: "Specific gravity compares a density to water's density, so water itself is 1." }
  ]},
  { id: "soil", name: "Soil Mechanics", questions: [
    { q: "The void ratio of a soil is defined as…", choices: ["Vv / Vs", "Vv / V", "Vw / Vv", "Vs / V"], answer: 0,
      explanation: "e = volume of voids / volume of solids. Vv/V is porosity." },
    { q: "Terzaghi's principle of effective stress is…", choices: ["σ' = σ + u", "σ' = σ − u", "σ' = σ × u", "σ' = u − σ"], answer: 1,
      explanation: "Effective stress equals total stress minus pore water pressure." },
    { q: "A soil has a liquid limit of 50% and a plastic limit of 30%. What is its plasticity index?", choices: ["10%", "20%", "30%", "80%"], answer: 1,
      explanation: "PI = LL − PL = 50 − 30 = 20%." },
    { q: "Under the USCS, coarse-grained soils are those with more than 50% retained on which sieve?", choices: ["No. 4", "No. 40", "No. 200", "No. 10"], answer: 2,
      explanation: "No. 200 sieve (0.075 mm). Soils mostly retained on it are coarse-grained; those mostly passing are fine-grained." },
    { q: "Consolidation of a saturated clay is mainly caused by…", choices: ["Evaporation of water", "Dissipation of excess pore water pressure", "Soil particle crushing", "Temperature change"], answer: 1,
      explanation: "As water slowly drains out, excess pore pressure dissipates and effective stress and settlement increase." }
  ]},
  { id: "concrete", name: "Reinforced Concrete", questions: [
    { q: "According to NSCP, the modulus of elasticity of normal-weight concrete is…", choices: ["Ec = 200,000 MPa", "Ec = 4700√f'c", "Ec = 0.85f'c", "Ec = 25√f'c"], answer: 1,
      explanation: "Ec = 4700√f'c (in MPa) for normal-weight concrete." },
    { q: "Lowering the water–cement ratio generally…", choices: ["decreases strength", "increases strength", "has no effect", "increases porosity"], answer: 1,
      explanation: "Less water means fewer pores in the hardened paste, so strength and durability go up (workability must still be adequate)." },
    { q: "At what age is the standard compressive strength f'c of concrete specified?", choices: ["7 days", "14 days", "28 days", "90 days"], answer: 2,
      explanation: "Design strength f'c is taken at 28 days of standard curing." },
    { q: "What is the main purpose of stirrups in a beam?", choices: ["Resist shear", "Resist compression only", "Hold the formwork", "Increase concrete weight"], answer: 0,
      explanation: "Stirrups carry diagonal tension caused by shear and confine the longitudinal bars." },
    { q: "What is the standard concrete test cylinder size?", choices: ["100 mm × 200 mm", "150 mm × 300 mm", "200 mm × 400 mm", "150 mm × 150 mm"], answer: 1,
      explanation: "The standard cylinder is 150 mm in diameter and 300 mm tall (ASTM C39 also allows 100 × 200 mm)." }
  ]}
];
