import fs from "node:fs";
import path from "node:path";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

type ServiceAccount = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

function readServiceAccountFile(): ServiceAccount | null {
  const file = process.env.FIREBASE_SERVICE_ACCOUNT_FILE;
  if (!file) return null;
  const fullPath = path.resolve(process.cwd(), file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Firebase service account file not found: ${fullPath}`);
  }
  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf8")) as ServiceAccount;
  } catch {
    throw new Error("Firebase service account JSON is invalid or incomplete.");
  }
}

function getFirebaseApp(): App {
  const apps = getApps();
  if (apps.length > 0) return apps[0];

  const fileAccount = readServiceAccountFile();
  const projectId = fileAccount?.project_id || process.env.FIREBASE_PROJECT_ID;
  const clientEmail = fileAccount?.client_email || process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (fileAccount?.private_key || process.env.FIREBASE_PRIVATE_KEY)
    ?.replace(/^"(.*)"$/, "$1")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .trim();

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing Firebase credentials. Set FIREBASE_SERVICE_ACCOUNT_FILE or the Firebase environment variables.");
  }

  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

export function db() {
  return getFirestore(getFirebaseApp());
}
