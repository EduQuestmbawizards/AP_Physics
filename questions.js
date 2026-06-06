// =============================================
// AP Physics 2 – Section I
// 40 Questions · 80 Minutes
// answers: 0=A, 1=B, 2=C, 3=D
// =============================================

const QUESTIONS = [
  {
    id: 1,
    text: "A green light (λ = 550 nm) is focused on a material with a work function of φ = 3 eV. What is the maximum kinetic energy of a photoelectron emitted from the material?",
    options: ["0.74 eV", "2.3 eV", "Electrons will not be emitted in this scenario.", "Cannot be determined without additional information"],
    answer: 2,
    topic: 7
  },
  {
    id: 2,
    text: "Two different ideal gases are brought to the same temperature. The molecules of the first gas are four times more massive compared to the second gas. How do the average speeds of the molecules of the two gases compare?",
    options: [
      "The average speeds are the same.",
      "The average speed of the molecules of the first gas are higher by a factor of 2.",
      "The average speed of the molecules of the second gas are higher by a factor of 2.",
      "The average speed of the molecules of the first gas are higher by a factor of 4."
    ],
    answer: 2,
    topic: 4
  },
  {
    id: 3,
    text: "If the angle, θ, is 20 degrees, and given that the index of refraction of water is n = 1.3, how far from the center would the laser hit the screen?",
    image: "assets/images/q3_q4_shared.png",
    options: [
      "79 cm from the center",
      "86 cm from the center",
      "184 cm from the center",
      "Cannot be determined without more information"
    ],
    answer: 1,
    topic: 1
  },
  {
    id: 4,
    text: "If a plane of glass (n = 1.5) is used as a lid, with no gap between the water and the glass, what will happen to the position of the laser on the screen?",
    image: "assets/images/q3_q4_shared.png",
    options: [
      "There will be no change in position.",
      "The laser will hit farther from the center.",
      "The laser will hit closer to the center.",
      "Cannot be determined without knowing the thickness of the glass"
    ],
    answer: 1,
    topic: 1
  },
  {
    id: 5,
    text: "In the figure above, a ray of light hits an object and travels through the focal point of a concave lens as shown by the dotted line. Which line best shows the correct continuation of the ray after it hits the lens?",
    image: "assets/images/q5_lens_ray.png",
    options: ["a", "b", "c", "d"],
    answer: 0,
    topic: 1
  },
  {
    id: 6,
    text: "An experiment is performed where standing sound waves are produced in open-ended cylinders of varying length. The frequencies of the waves are adjusted until the first harmonic is reached in a 1 m cylinder, the second harmonic is reached in a 2 m cylinder, and the third harmonic is reached in a 3 m cylinder. If the frequencies are f₁, f₂, and f₃, respectively, what is the relationship between these frequencies?",
    options: [
      "f₁ = f₂ = f₃",
      "f₁ < f₂ < f₃",
      "f₁ > f₂ > f₃",
      "f₁ = f₂ < f₃"
    ],
    answer: 0,
    topic: 2
  },
  {
    id: 7,
    text: "An ideal gas undergoes an isothermal compression. What best describes the heat flow during this process?",
    options: [
      "No heat flows.",
      "Heat flows out of the gas.",
      "Heat flows into the gas.",
      "Heat initially flows out of the gas, but the same amount of heat then flows into the gas."
    ],
    answer: 1,
    topic: 4
  },
  {
    id: 8,
    text: "In the above circuit, the capacitor is initially uncharged and the switch is closed. What best describes the current through the ammeter after the switch is closed?",
    image: "assets/images/q8_q9_q10_circuit.png",
    options: [
      "The current starts at a maximum and decreases to zero.",
      "The current starts at a maximum and decreases to a non-zero amount.",
      "The current starts at zero and increases to a set amount.",
      "Cannot be determined without knowing the capacitance of the capacitor"
    ],
    answer: 1,
    topic: 6
  },
  {
    id: 9,
    text: "After a long period of time, the switch is opened. What is the current through the ammeter immediately after the switch is opened?",
    image: "assets/images/q8_q9_q10_circuit.png",
    options: ["0 A", "0.44 A", "0.8 A", "1.8 A"],
    answer: 2,
    topic: 6
  },
  {
    id: 10,
    text: "The capacitor is replaced with a piece of wire with negligible resistance. If the switch is again closed, what is the voltage across the 2 Ω resistor?",
    image: "assets/images/q8_q9_q10_circuit.png",
    options: ["1 V", "2 V", "6 V", "12 V"],
    answer: 1,
    topic: 6
  },
  {
    id: 11,
    text: "An electron in an atom transitions from an excited state of −16 eV down to a ground state of −20 eV. What is the wavelength of the emitted photon?",
    options: ["31 nm", "78 nm", "311 nm", "780 nm"],
    answer: 2,
    topic: 7
  },
  {
    id: 12,
    text: "In the diagram above, a straight wire with a current I points vertically upward. At point P, which direction is the magnetic field pointing?",
    image: "assets/images/q12_magnetic_wire.png",
    options: ["Up", "Left", "Into the page", "Out of the page"],
    answer: 1,
    topic: 5
  },
  {
    id: 13,
    text: "Two point charges, q₁ and q₂, are separated by a distance r in a vacuum. What change would cause the magnitude of the electric force between the charges to double?",
    options: [
      "q₁ is doubled.",
      "r is halved.",
      "Both q₁ and q₂ are doubled.",
      "The sign of the charge on q₁ is flipped."
    ],
    answer: 0,
    topic: 3
  },
  {
    id: 14,
    text: "Two positive point charges with charge +Q and +2Q are placed on a horizontal x-axis separated by a distance r in vacuum. At which of these points could the electric field be zero?",
    options: [
      "To the left of both charges",
      "To the right of both charges",
      "In between the charges, closer to the +Q charge",
      "In between the charges, closer to the +2Q charge"
    ],
    answer: 2,
    topic: 3
  },
  {
    id: 15,
    text: "A student performs a double-slit experiment and successfully creates an interference pattern on the screen. Which of the following will occur if the distance between the slits, d, is increased?",
    options: [
      "The fringes will spread out.",
      "The fringes will get closer.",
      "The intensity of the pattern will increase.",
      "The width of the central peak will widen."
    ],
    answer: 1,
    topic: 1
  },
  {
    id: 16,
    text: "An observer stands at rest as a car with a siren drives directly towards them at a constant speed. Which of the following is correct regarding the sound of the siren heard by the observer as the car approaches?",
    options: [
      "The frequency of the sound is increasing.",
      "The frequency of the sound is constant.",
      "The frequency of the sound is decreasing.",
      "The amplitude of the sound is constant."
    ],
    answer: 1,
    topic: 2
  },
  {
    id: 17,
    text: "Plutonium undergoes alpha decay to form uranium as shown below: ²³⁹₉₄Pu → ²³⁵₉₂U + ⁴₂He. This process causes the daughter nuclei to gain energy. What is the best explanation for this?",
    options: [
      "The combined mass of the uranium and helium is greater than that of the plutonium.",
      "The combined mass of the uranium and helium is less than that of the plutonium.",
      "Conservation of momentum requires that the velocities of the products cancel out.",
      "Conservation of charge requires that the electrostatic force pushes the products away from each other."
    ],
    answer: 1,
    topic: 7
  },
  {
    id: 18,
    text: "A sound wave has an initial intensity of I₀. Which of the following correctly shows the relationship between the intensity of the sound wave, I, and distance, r?",
    image: "assets/images/q18_intensity_graphs.png",
    options: [
      "Graph A — starts at I₀, decreases linearly to zero",
      "Graph B — starts at I₀, curves upward",
      "Graph C — starts at I₀, decreases as inverse square (curved down)",
      "Graph D — starts at I₀, decreases slowly then levels off"
    ],
    answer: 2,
    topic: 2
  },
  {
    id: 19,
    text: "An ideal gas initially has a pressure of 2 × 10⁵ Pa and a volume of 0.5 m³. It then expands at a constant pressure to a volume of 2 m³, and after expanding its pressure is increased to 5 × 10⁵ Pa while it's held at a constant volume. What is the total work done by the gas during both transitions?",
    options: [
      "3 × 10⁵ J",
      "4.5 × 10⁵ J",
      "6 × 10⁵ J",
      "7.5 × 10⁵ J"
    ],
    answer: 0,
    topic: 4
  },
  {
    id: 20,
    text: "What is the emf induced in the loop as it enters the magnetic field?",
    image: "assets/images/q20_q21_q22_magnetic_loop.png",
    options: ["0.5 V", "4.5 V", "50 V", "450 V"],
    answer: 3,
    topic: 5
  },
  {
    id: 21,
    text: "What is the direction of the current in and force on the wire on the right side of the loop as it enters the field?",
    image: "assets/images/q20_q21_q22_magnetic_loop.png",
    options: [
      "Current is flowing up and force is to the right.",
      "Current is flowing down and force is to the right.",
      "Current is flowing up and force is to the left.",
      "Current is flowing down and force is to the left."
    ],
    answer: 3,
    topic: 5
  },
  {
    id: 22,
    text: "After fully entering the field, the loop comes to a stop and starts to rotate at a constant rate about a horizontal axis. Which choice correctly describes the emf as it spins?",
    image: "assets/images/q20_q21_q22_magnetic_loop.png",
    options: [
      "Because it is spinning at a constant rate, the emf will be constant but non-zero.",
      "Because the magnetic field is constant, the emf will be zero.",
      "The emf will be at a maximum when the loop is parallel to the page, because this is where the flux is at a maximum.",
      "The emf will be at a minimum when the loop is parallel to the page, because this is where the change in flux is at a minimum."
    ],
    answer: 2,
    topic: 5
  },
  {
    id: 23,
    text: "A convex lens with a focal length of 20 cm is used to form an image of an object placed 15 cm behind the lens. Which of the following is true about the image formed?",
    options: [
      "The image is virtual and located 8.6 cm behind the lens.",
      "The image is virtual and located 60 cm behind the lens.",
      "The image is real and located 8.6 cm in front of the lens.",
      "The image is real and located 60 cm in front of the lens."
    ],
    answer: 1,
    topic: 1
  },
  {
    id: 24,
    text: "A positive charge of 3Q and a negative charge of 2Q are arranged as shown above. If the electric potentials are compared between two of the four labeled points, which of the following would have the greatest change in potential?",
    image: "assets/images/q24_charge_diagram.png",
    options: ["|Vₐ−V_b|", "|Vₐ−V_c|", "|V_c−V_b|", "|V_c−V_d|"],
    answer: 1,
    topic: 3
  },
  {
    id: 25,
    text: "An image is created by placing an object in front of a concave lens. If the lens is replaced with one of identical shape but with a lower index of refraction, which of the following changes would occur?",
    options: [
      "The focal length would increase and the image would be formed farther from the lens.",
      "The focal length would increase and the image would be formed closer to the lens.",
      "The focal length would decrease and the image would be formed farther from the lens.",
      "The focal length would decrease and the image would be formed closer to the lens."
    ],
    answer: 0,
    topic: 1
  },
  {
    id: 26,
    text: "In the above figure, an unknown charge, Q, with negligible mass travels to the right with speed v through a region with uniform magnetic field, B, pointing out of the page. Which of the following is possible?",
    image: "assets/images/q26_charge_magnetic.png",
    options: [
      "The charge passes through point a with a speed lower than v.",
      "The charge passes through point b with a speed equal to v.",
      "The charge passes through point c with a speed higher than v.",
      "The charge passes through point a with a speed equal to v."
    ],
    answer: 1,
    topic: 5
  },
  {
    id: 27,
    text: "An experiment was performed that measured the charge on a capacitor while connected to a variable battery at several voltages. What is the capacitance of the capacitor that produced the graph above?",
    image: "assets/images/q27_capacitance_graph.png",
    options: ["0.5 mF", "1 mF", "5 mF", "10 mF"],
    answer: 2,
    topic: 6
  },
  {
    id: 28,
    text: "Three resistors are connected to a battery in parallel. If R₁ < R₂ < R₃, what is the relationship between the voltages across each resistor?",
    options: [
      "V₁ < V₂ < V₃",
      "V₁ > V₂ > V₃",
      "V₁ = V₂ = V₃",
      "Cannot be determined without more information"
    ],
    answer: 2,
    topic: 6
  },
  {
    id: 29,
    text: "Three neutral conducting spheres sit on insulating bases. The first sphere is given a positive charge. It is then brought in contact with the second sphere and allowed to reach equilibrium. The two spheres are then separated. Finally, the second sphere is brought into contact with the third sphere and allowed to reach equilibrium. If the charge on the first, second, and third spheres after this process is Q₁, Q₂, and Q₃, respectively, what is the correct relationship between these charges?",
    image: "assets/images/q29_spheres.png",
    options: [
      "Q₁ = Q₂ = Q₃",
      "Q₁ > Q₂ > Q₃",
      "Q₁ < Q₂ < Q₃",
      "Q₁ > Q₂ = Q₃"
    ],
    answer: 3,
    topic: 3
  },
  {
    id: 30,
    text: "In the above diagram, an ideal gas undergoes the cycle ABCDA. What is the change in internal energy after the cycle?",
    image: "assets/images/q30_pv_diagram.png",
    options: [
      "(V₂−V₁)(P₂−P₁)",
      "(V₂−V₁)P₂",
      "(P₂−P₁)V₂",
      "0"
    ],
    answer: 3,
    topic: 4
  },
  {
    id: 31,
    text: "In the circuit shown above, what is the current through the 3 Ω resistor?",
    image: "assets/images/q31_circuit.png",
    options: ["0.83 A", "1.3 A", "2.9 A", "3.3 A"],
    answer: 0,
    topic: 6
  },
  {
    id: 32,
    text: "The above graph shows the displacement height of a string against its horizontal position as a wave travels along its length. If the period of the wave is 5 ms, what is the speed of the wave?",
    image: "assets/images/q32_wave_graph.png",
    options: ["10 m/s", "40 m/s", "200 m/s", "400 m/s"],
    answer: 3,
    topic: 2
  },
  {
    id: 33,
    text: "During an isothermal expansion, an ideal gas pushes a piston with a mass of 2 kg up a height of 20 cm. Approximately what is the amount of heat that flows into the gas during this process?",
    options: ["0 J", "4 J", "10 J", "400 J"],
    answer: 1,
    topic: 4
  },
  {
    id: 34,
    text: "Two point charges, Q₁ and Q₂, are placed 3 m apart. If Q₁ = +5 μC and Q₂ = −2 μC, what is the magnitude and direction of the electric field at the midpoint between the charges?",
    options: [
      "28 kN/C, towards Q₁",
      "28 kN/C, towards Q₂",
      "12 kN/C, towards Q₁",
      "12 kN/C, towards Q₂"
    ],
    answer: 1,
    topic: 3
  },
  {
    id: 35,
    text: "A bar magnet is moved toward a coil of wire at a constant speed. As a result, a current is induced in the coil. If the bar magnet suddenly changes direction and moves away from the coil at the same constant speed, what happens to the induced current?",
    options: [
      "The induced current increases.",
      "The induced current decreases.",
      "The induced current changes direction.",
      "The induced current does not change."
    ],
    answer: 2,
    topic: 5
  },
  {
    id: 36,
    text: "A 6 μF capacitor and 15 μF capacitor are connected in series to a 12 V battery. After the circuit reaches equilibrium, what is the approximate charge on the 6 μF capacitor?",
    options: ["26 μC", "51.5 μC", "126 μC", "252 μC"],
    answer: 1,
    topic: 6
  },
  {
    id: 37,
    text: "The above graph shows the wave function of a certain particle. Of the labeled points, which one(s) are the least likely to be the particle's position when observed?",
    image: "assets/images/q37_wavefunction_graph.png",
    options: ["a", "b and d", "c", "a, c, and e"],
    answer: 1,
    topic: 7
  },
  {
    id: 38,
    text: "A cooling fan is used to reduce the temperature of a system by blowing air past it and carrying heat away. Why does this not violate the Second Law of Thermodynamics?",
    options: [
      "The second law only applies to isolated systems and since the air is leaving the area, this is an open system.",
      "The temperature decrease does not mean an entropy decrease in this scenario.",
      "The entropy of the surroundings will increase less than the entropy of the object decreases.",
      "The heat lost will match the loss of internal energy."
    ],
    answer: 0,
    topic: 4
  },
  {
    id: 39,
    text: "Two charges, one with a mass of 5 kg and a charge of +3 C and the other with a mass of 2 kg and a charge of +2 C, are positioned next to each other. What would the resulting motion be?",
    options: [
      "The charges move away from each other with the same acceleration.",
      "The charges move away from each other and the +3 C charge has greater acceleration.",
      "The charges move away from each other and the +2 C charge has greater acceleration.",
      "The charges move towards each other with the same acceleration."
    ],
    answer: 2,
    topic: 3
  },
  {
    id: 40,
    text: "A detector is positioned to measure the intensity of an object's blackbody radiation at a distance, d, from the object. If the temperature of the object is increased by a factor of 2, what will happen to the intensity measured by the detector?",
    options: [
      "The intensity will increase by a factor of 2.",
      "The intensity will increase by a factor of 4.",
      "The intensity will increase by a factor of 8.",
      "The intensity will increase by a factor of 16."
    ],
    answer: 3,
    topic: 7
  }
];

const ANSWER_KEY = QUESTIONS.map(q => ({ id: q.id, answer: q.answer }));

const TOPIC_MAP = {
  1: { name: "Optics & Light",              questions: [3, 4, 5, 15, 23, 25] },
  2: { name: "Waves & Sound",               questions: [6, 16, 18, 32] },
  3: { name: "Electric Force & Field",      questions: [13, 14, 24, 29, 34, 39] },
  4: { name: "Thermodynamics & Gases",      questions: [2, 7, 19, 30, 33, 38] },
  5: { name: "Magnetism & Induction",       questions: [12, 20, 21, 22, 26, 35] },
  6: { name: "Circuits & Capacitors",       questions: [8, 9, 10, 27, 28, 31, 36] },
  7: { name: "Modern Physics",              questions: [1, 11, 17, 37, 40] }
};
