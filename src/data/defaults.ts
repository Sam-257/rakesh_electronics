import type { ContentMap } from '../types/content';

export const defaults: ContentMap = {
  hero: {
    title: 'Your Trusted Partner for',
    highlight: 'Electronic Spare Parts',
    subtitle:
      "Genuine components, competitive prices, and expert advice — all under one roof. From capacitors to microcontrollers, we've got you covered.",
    primaryCta: 'Browse Products',
    secondaryCta: 'Get in Touch',
  },

  storeInfo: {
    shopName: 'Rakesh Electronics',
    tagline:
      'Your trusted partner for electronic spare parts and components since 1992.',
    address: 'Main Rd, opp. S.R.M.T, Rama Rao Peta,\nKakinada, Andhra Pradesh 533001',
    phone: '+91 9490890159',
    email: 'info@rakeshelectronics.in',
    hours: 'Mon – Sat: 10:00 AM – 9:00 PM\nSun: 10:00 AM – 2:00 PM',
  },

  about: {
    storyTitle: 'Our Story',
    storyText:
      "Founded in 1992, Rakesh Electronics started as a small counter in New Delhi's bustling electronics market. What began as a passion for circuits and components has grown into one of the area's most trusted names for electronic spare parts.\n\nOver the years, we've served thousands of customers — from engineering students working on their first project, to seasoned repair technicians, to businesses sourcing components in bulk. Our commitment to genuine parts, fair prices and helpful service has remained unchanged.\n\nToday, we stock thousands of components across capacitors, resistors, ICs, connectors, cables, display modules and more — and we're always adding new products to meet the evolving needs of our customers.",
  },

  aboutValues: [
    {
      id: 1,
      icon: 'HiOutlineShieldCheck',
      title: 'Quality Assurance',
      text: 'Every component we sell is sourced from trusted manufacturers and tested for reliability.',
    },
    {
      id: 2,
      icon: 'HiOutlineUserGroup',
      title: 'Customer First',
      text: 'We go the extra mile to help you find exactly what you need — no question too small.',
    },
    {
      id: 3,
      icon: 'HiOutlineTrendingUp',
      title: 'Always Growing',
      text: 'We continuously expand our inventory to keep up with the latest in electronics technology.',
    },
  ],

  categories: [
    { id: 1, icon: 'BsLightningCharge', label: 'Capacitors', color: '#f59e0b' },
    { id: 2, icon: 'BsToggles', label: 'Resistors', color: '#10b981' },
    { id: 3, icon: 'BsCpu', label: 'ICs & Chips', color: '#8b5cf6' },
    { id: 4, icon: 'BsPlug', label: 'Connectors', color: '#ef4444' },
    { id: 5, icon: 'BsUsbSymbol', label: 'Cables & Wires', color: '#3b82f6' },
    { id: 6, icon: 'BsDisplay', label: 'Displays', color: '#ec4899' },
  ],

  highlights: [
    {
      id: 1,
      icon: 'HiOutlineCollection',
      title: 'Wide Selection',
      description: 'Thousands of components across capacitors, resistors, ICs, connectors, cables and more.',
    },
    {
      id: 2,
      icon: 'HiOutlineBadgeCheck',
      title: 'Genuine Parts',
      description: 'We source directly from reputed manufacturers to guarantee authenticity and quality.',
    },
    {
      id: 3,
      icon: 'HiOutlineLightBulb',
      title: 'Expert Advice',
      description: 'Our knowledgeable staff can help you find the right part for your project.',
    },
    {
      id: 4,
      icon: 'HiOutlineCurrencyRupee',
      title: 'Affordable Prices',
      description: 'Competitive pricing with bulk discounts on frequently ordered components.',
    },
  ],

  testimonials: [
    {
      id: 1,
      name: 'Amit Sharma',
      role: 'Hobbyist & Arduino Maker',
      text: 'Rakesh Electronics is my go-to shop for all components. Their collection of ICs and microcontrollers is unmatched in the area.',
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Mobile Repair Technician',
      text: 'Genuine spare parts at fair prices. The staff always helps me find the exact connector or display I need. Highly recommended!',
    },
    {
      id: 3,
      name: 'Sunil Verma',
      role: 'Electronics Engineering Student',
      text: 'For college projects and lab work, this shop has everything. Great advice from the owner and quick service every time.',
    },
  ],

  products: [
    { id: 1, name: 'Ceramic Capacitor Pack (100pcs)', description: 'High-quality ceramic disc capacitors, assorted values from 10pF to 100nF. Ideal for general-purpose circuits.', category: 'Capacitors', price: 149 },
    { id: 2, name: 'Electrolytic Capacitor Kit', description: 'Radial electrolytic capacitors, 1µF to 1000µF range. Long-life, low ESR design.', category: 'Capacitors', price: 249 },
    { id: 3, name: 'Carbon Film Resistor Set (500pcs)', description: '1/4W carbon film resistors, 1Ω to 1MΩ. 5% tolerance, colour-coded bands.', category: 'Resistors', price: 199 },
    { id: 4, name: 'SMD Resistor Book (0805)', description: 'Surface-mount resistor sample book, 0805 package. 170 values × 50pcs each.', category: 'Resistors', price: 599 },
    { id: 5, name: 'NE555 Timer IC (10pcs)', description: 'Classic 555 timer IC in DIP-8 package. For oscillators, timers and PWM circuits.', category: 'ICs & Chips', price: 99 },
    { id: 6, name: 'Arduino Nano V3 Compatible Board', description: 'ATmega328P-based microcontroller board with USB Mini-B connector. Pre-loaded bootloader.', category: 'ICs & Chips', price: 349 },
    { id: 7, name: '2-Pin JST Connector Set (20 pairs)', description: 'Male and female JST-XH 2-pin connectors with pre-crimped wires. Great for battery connections.', category: 'Connectors', price: 129 },
    { id: 8, name: 'USB Type-C Breakout Board', description: 'USB-C female connector on a breadboard-friendly breakout. Exposes power and data lines.', category: 'Connectors', price: 79 },
    { id: 9, name: 'Jumper Wire Kit (120pcs)', description: 'Male-to-male, male-to-female, female-to-female dupont jumper wires. 10cm, 20cm and 30cm lengths.', category: 'Cables & Wires', price: 159 },
    { id: 10, name: 'Silicone Hook-Up Wire (6 colours)', description: '22AWG stranded silicone wire, 5m per colour. Heat resistant, flexible, easy to strip.', category: 'Cables & Wires', price: 299 },
    { id: 11, name: '0.96" OLED Display Module (I2C)', description: '128×64 pixel SSD1306 OLED display. I2C interface, 3.3V/5V compatible. White text on black.', category: 'Displays', price: 199 },
    { id: 12, name: '16×2 LCD Display with I2C Adapter', description: 'Classic HD44780-based character LCD with soldered I2C backpack. Blue backlight, white text.', category: 'Displays', price: 179 },
  ],

  theme: {
    colorPrimary: '#2563eb',
    colorPrimaryDark: '#1d4ed8',
    colorPrimaryLight: '#dbeafe',
    colorSecondary: '#0f172a',
    colorAccent: '#f59e0b',
    colorText: '#1e293b',
    colorTextLight: '#64748b',
    colorBg: '#ffffff',
    colorBgAlt: '#f8fafc',
    colorBorder: '#e2e8f0',
    heroGradientStart: '#0f172a',
    heroGradientMid: '#1e3a5f',
    heroGradientEnd: '#2563eb',
    headerGradientStart: '#0f172a',
    headerGradientEnd: '#1e3a5f',
    footerBg: '#0f172a',
  },
};
