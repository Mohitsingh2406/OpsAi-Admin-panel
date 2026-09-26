import fs from "node:fs";
import path from "node:path";
import { config } from "dotenv";
config({ path: ".env.local" });

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

type Account = { project_id?: string; client_email?: string; private_key?: string };
function getAccount(): Account | null {
  const file = process.env.FIREBASE_SERVICE_ACCOUNT_FILE;
  if (!file) return null;
  const fullPath = path.resolve(process.cwd(), file);
  if (!fs.existsSync(fullPath)) throw new Error(`Service account file not found: ${fullPath}`);
  return JSON.parse(fs.readFileSync(fullPath, "utf8")) as Account;
}

function getDb() {
  const file = getAccount();
  const projectId = file?.project_id || process.env.FIREBASE_PROJECT_ID;
  const clientEmail = file?.client_email || process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (file?.private_key || process.env.FIREBASE_PRIVATE_KEY)
    ?.replace(/^"(.*)"$/, "$1").replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();
  if (!projectId || !clientEmail || !privateKey) throw new Error("Missing Firebase credentials. Set FIREBASE_SERVICE_ACCOUNT_FILE or Firebase environment variables.");
  const app = getApps().length ? getApps()[0] : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  return getFirestore(app);
}

const blogPosts = [
  ["The control layer for enterprise AI", "control-layer-for-enterprise-ai", "Why AI agents need one place that decides what they are allowed to do.", "published"],
  ["Runtime authorization, explained", "runtime-authorization-explained", "Identity, policy, risk and approval resolved before the call goes out.", "published"],
  ["Why policy should not be a prompt", "why-policy-should-not-be-a-prompt", "Deterministic rules, not model judgement, decide what an agent can do.", "published"],
  ["Connecting your first AI system", "connecting-your-first-ai-system", "A walkthrough of bringing an existing agent under one control point.", "published"],
  ["What an evidence record actually proves", "what-an-evidence-record-proves", "How sealed evidence makes an AI action explainable after the fact.", "draft"],
  ["Notes on the RACI model for AI agents", "raci-model-for-ai-agents", "Why accountability should start with a named person and narrow at every hop.", "draft"],
  ["AI observability beyond model logs", "ai-observability-beyond-model-logs", "The operational signals that matter when agents begin taking action.", "published"],
  ["Designing approval workflows for high-risk actions", "approval-workflows-high-risk-actions", "How named co-signers, expiry and bounded execution work together.", "published"],
  ["From inventory to governance", "from-inventory-to-governance", "A practical route from discovering AI systems to governing their behavior.", "published"],
  ["What changes when AI crosses from drafting to doing", "drafting-to-doing", "Why runtime controls become important once an agent can change real state.", "published"],
  ["Building an accountable AI estate", "building-accountable-ai-estate", "Owners, systems, policies and evidence as one operating model.", "draft"],
  ["A practical guide to model routing", "practical-model-routing", "Route workloads with governance, cost and posture in mind.", "published"],
];

const careers = [
  ["Founding engineer", "Engineering", "Bengaluru / Remote", "Full-time", "open"],
  ["Product designer", "Design", "Remote", "Full-time", "open"],
  ["Backend engineer, policy engine", "Engineering", "Bengaluru", "Full-time", "open"],
  ["Developer relations engineer", "Developer Experience", "Remote", "Contract", "closed"],
  ["Security engineer", "Security", "Remote", "Full-time", "open"],
  ["Solutions engineer", "Customer Operations", "Mumbai", "Full-time", "closed"],
  ["Frontend engineer", "Engineering", "Remote", "Full-time", "open"],
  ["AI governance researcher", "Research", "Remote", "Full-time", "open"],
  ["Technical writer", "Developer Experience", "Remote", "Contract", "closed"],
  ["Cloud infrastructure engineer", "Infrastructure", "Bengaluru / Remote", "Full-time", "open"],
];

const contacts = [
  ["Priya Nair", "priya.nair@example.com", "Support Ops", "We are evaluating OpsAI for our refund-approval workflow. Could we get a walkthrough of policy versioning?", false],
  ["Rahul Menon", "rahul.menon@example.com", "Finance", "Interested in the audit trail feature. Does it integrate with an existing SIEM?", true],
  ["Anita Rao", "anita.rao@example.com", "Northwind Retail", "Is there a sandbox environment we can test before committing?", false],
  ["Kabir Sen", "kabir.sen@example.com", "Legal", "We need to understand data residency for the evidence record before a review call.", true],
  ["Meera Iyer", "meera.iyer@example.com", "Northwind Retail", "Following up to get pricing for roughly 15 connected AI systems.", false],
  ["Dev Patel", "dev.patel@example.com", "Platform Engineering", "Does OpsAI support LangGraph agents out of the box?", true],
  ["Sana Khan", "sana.khan@example.com", "Acme Finance", "Can your approval layer require two named co-signers for payments?", false],
  ["Arjun Shah", "arjun.shah@example.com", "Security", "Please share your enterprise security questionnaire and deployment options.", false],
  ["Nikhil Joshi", "nikhil.joshi@example.com", "Procurement", "We would like to discuss procurement workflows and approval boundaries.", true],
  ["Rhea Kapoor", "rhea.kapoor@example.com", "IT", "Can we connect existing agents without changing the underlying model provider?", false],
];

async function seed() {
  const db = getDb();
  const now = Date.now();
  const write = async (collection: string, id: string, data: Record<string, unknown>) => db.collection(collection).doc(id).set(data, { merge: true });

  await Promise.all(blogPosts.map(([title, slug, excerpt, status], i) => {
    const at = Timestamp.fromMillis(now - i * 36e5 * 8);
    return write("blogPosts", `demo-blog-${i + 1}`, { title, slug, excerpt, content: `${excerpt} This is illustrative OpsAI demo content for the admin console.`, status, createdAt: at, updatedAt: at, category: i % 2 ? "Governance" : "Platform", author: "OpsAI Editorial" });
  }));
  await Promise.all(careers.map(([title, department, location, type, status], i) => {
    const at = Timestamp.fromMillis(now - i * 36e5 * 12);
    return write("careers", `demo-career-${i + 1}`, { title, department, location, type, status, description: `Help OpsAI build the operational layer around enterprise AI. This demo role shows how a production posting can be managed from the console.`, createdAt: at, updatedAt: at });
  }));
  await Promise.all(contacts.map(([name, email, company, message, read], i) => {
    const at = Timestamp.fromMillis(now - i * 36e5 * 3);
    return write("contactSubmissions", `demo-contact-${i + 1}`, { name, email, company, message, read, createdAt: at });
  }));
  console.log(`✓ Demo seed complete: ${blogPosts.length} blogs, ${careers.length} careers, ${contacts.length} contacts.`);
}

seed().catch((error) => { console.error("Seed failed:", error instanceof Error ? error.message : error); process.exit(1); });
