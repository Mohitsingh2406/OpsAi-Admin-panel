export const estate = [
  { name: "refund-resolver", owner: "Priya Nair", autonomy: "L3 · Approval", state: "Acting", system: "Razorpay" },
  { name: "order-lookup", owner: "Priya Nair", autonomy: "L1 · Observe", state: "Acting", system: "Salesforce" },
  { name: "ap-invoice-agent", owner: "Rahul Menon", autonomy: "L2 · Advise", state: "Acting", system: "NetSuite" },
  { name: "payout-runner", owner: "Rahul Menon", autonomy: "L4 · Autonomous", state: "Watched", system: "RazorpayX" },
  { name: "vendor-onboard", owner: "Anita Rao", autonomy: "L3 · Approval", state: "Acting", system: "Zoho Books" },
  { name: "inventory-sync", owner: "Anita Rao", autonomy: "L2 · Advise", state: "Acting", system: "Postgres" },
];

export const demoActivity = [
  { type: "contact", title: "New enterprise enquiry from Priya Nair", meta: "Support Ops · 4 min ago", icon: "message" },
  { type: "blog", title: "Published: Runtime authorization, explained", meta: "Blog · 18 min ago", icon: "file" },
  { type: "career", title: "3 new applications for Founding Engineer", meta: "Careers · 42 min ago", icon: "briefcase" },
  { type: "system", title: "Firebase connection checked successfully", meta: "System · 1 hr ago", icon: "shield" },
  { type: "blog", title: "Draft updated: What an evidence record proves", meta: "Blog · 2 hrs ago", icon: "edit" },
  { type: "contact", title: "Security questionnaire received from Northwind", meta: "Contact · 3 hrs ago", icon: "message" },
  { type: "career", title: "Security Engineer moved to shortlist", meta: "Applications · 5 hrs ago", icon: "user" },
  { type: "seo", title: "Homepage SEO description updated", meta: "Website · Yesterday", icon: "globe" },
];

export const weeklyTraffic = [38, 52, 47, 71, 64, 82, 76, 91, 68, 74, 88, 96];

export const applications = [
  { name: "Aarav Shah", role: "Founding Engineer", stage: "Shortlisted", score: "92%", time: "12 min ago" },
  { name: "Riya Kapoor", role: "Product Designer", stage: "Review", score: "88%", time: "41 min ago" },
  { name: "Dev Mehta", role: "Backend Engineer, Policy Engine", stage: "Interview", score: "95%", time: "1 hr ago" },
  { name: "Nisha Verma", role: "Security Engineer", stage: "New", score: "86%", time: "2 hrs ago" },
  { name: "Karan Bhat", role: "Solutions Engineer", stage: "Review", score: "81%", time: "4 hrs ago" },
  { name: "Sana Khan", role: "Developer Relations Engineer", stage: "New", score: "84%", time: "Yesterday" },
];

export const media = [
  { name: "opsai-control-layer.webp", type: "WebP", size: "248 KB", used: "Homepage hero", updated: "Today" },
  { name: "runtime-authorization.webp", type: "WebP", size: "184 KB", used: "Blog cover", updated: "Today" },
  { name: "enterprise-ai-og.png", type: "PNG", size: "612 KB", used: "SEO / Social", updated: "Yesterday" },
  { name: "razorpay-system.svg", type: "SVG", size: "18 KB", used: "Integration", updated: "Sep 24" },
  { name: "security-grid.webp", type: "WebP", size: "321 KB", used: "Security page", updated: "Sep 22" },
  { name: "opsai-mark.svg", type: "SVG", size: "4 KB", used: "Global brand", updated: "Sep 18" },
];

export const seoPages = [
  { page: "Homepage", path: "/", title: "OpsAI — The control layer for enterprise AI", status: "Healthy", score: 98 },
  { page: "Platform", path: "/platform", title: "Enterprise AI Control Platform | OpsAI", status: "Healthy", score: 94 },
  { page: "Careers", path: "/careers", title: "Careers at OpsAI", status: "Needs review", score: 82 },
  { page: "Blog", path: "/blog", title: "OpsAI Blog — Enterprise AI Governance", status: "Healthy", score: 91 },
  { page: "Contact", path: "/contact", title: "Talk to OpsAI", status: "Healthy", score: 96 },
];
