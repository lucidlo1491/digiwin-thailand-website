/**
 * metal-plastics-metal-faq.js — Metal Faq Section (S9)
 *
 * Source: metal-plastics.html line 772
 */

const template = require('../../lib/templates/faq-accordion');

const data = {
  sectionPrefix: 'metal-faq',
  items: [
    { question: 'What ERP system is best for metal stamping factories in Thailand?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin offers ERP and MES solutions specifically designed for metal stamping and process manufacturing environments. The system includes real-time process parameter monitoring that captures temperature, pressure, and speed data from every cycle, then correlates those parameters directly to quality outcomes. For metal stamping factories where material costs represent 50-70% of total costs, this data-driven approach delivers an average 15% yield improvement and 30% reduction in unplanned downtime.</p>' },
    { question: 'How does DigiWin help reduce scrap in injection molding?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin reduces injection molding scrap through real-time yield tracking combined with SPC integration. The system categorizes defects by type and correlates them to specific machines, shifts, and material lots using Pareto analysis and root cause correlation tools. Rather than discovering quality issues after the fact, operators receive out-of-spec alerts the moment process parameters drift, enabling immediate correction. This approach targets root causes rather than symptoms, turning small yield improvements into significant profit impact when material costs are your largest expense.</p>' },
    { question: 'Can DigiWin track mold and die maintenance and shot counts?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Yes. DigiWin includes a built-in die and mold management module that tracks shot counts, complete maintenance history, and performance trending for every tool. The system predicts maintenance needs based on usage data, scheduling preventive maintenance before catastrophic failures occur. This eliminates the guesswork around questions like which die is causing defects and when a mold needs service, replacing reactive maintenance with data-driven tool performance management.</p>' },
    { question: 'Does DigiWin support BOI compliance for metal and plastics manufacturers?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Yes. DigiWin provides production-order-level material reconciliation specifically designed for BOI audits in metal and plastics manufacturing. The system tracks actual material consumption per mold run, which is essential for co-product and multi-cavity tracking that BOI auditors require. Manufacturers using DigiWin for BOI compliance benefit from BOI-ready audit reports, accurate co-product cost allocation, and proven savings exceeding 10 million THB per year.</p>' },
    { question: 'What process types does DigiWin support?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin supports a comprehensive range of metal and plastics processing methods including stamping, injection molding, die casting, CNC machining, forging, extrusion, sheet metal fabrication, and blow molding. Each process type benefits from DigiWin\'s core capabilities in cycle time optimization, process parameter monitoring, scrap analysis, and die/mold management. The system provides 100% cycle time visibility with auto cycle detection, drift alerts, and OEE calculation regardless of the specific manufacturing process.</p>' },
  ],
};

module.exports = { blocks: () => template.blocks(data), css: () => template.css(data) };
