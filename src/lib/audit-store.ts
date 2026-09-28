export interface AuditActivity {
  id: string;
  employeeId: string;
  sessionId: string;
  timestamp: string;
  action: "LOGIN" | "LOGOUT" | "CREATE" | "UPDATE" | "DELETE" | "EXPORT" | "STATUS CHANGE" | "PERMISSION CHANGE";
  module: string;
  target?: string;
  description: string;
  previousValue?: string;
  newValue?: string;
  status: "SUCCESS" | "FAILED";
}

const INITIAL_ACTIVITIES: AuditActivity[] = [
  {
    id: "ACT-001",
    employeeId: "EMP-1042",
    sessionId: "SESSION-8F92A1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    action: "LOGIN",
    module: "Authentication",
    description: "User logged into the admin panel",
    status: "SUCCESS"
  },
  {
    id: "ACT-002",
    employeeId: "EMP-1042",
    sessionId: "SESSION-8F92A1",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    action: "UPDATE",
    module: "Employee Management",
    target: "Employee #EMP-1098",
    description: "Changed employee role",
    previousValue: "Operator",
    newValue: "Manager",
    status: "SUCCESS"
  },
  {
    id: "ACT-003",
    employeeId: "EMP-1042",
    sessionId: "SESSION-8F92A1",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    action: "CREATE",
    module: "Blog",
    target: "Article #142",
    description: "Created new blog draft 'AI in Enterprise'",
    status: "SUCCESS"
  },
  {
    id: "ACT-004",
    employeeId: "EMP-0921",
    sessionId: "SESSION-2B44C9",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    action: "EXPORT",
    module: "Contacts",
    description: "Exported contact list to CSV",
    status: "SUCCESS"
  },
  {
    id: "ACT-005",
    employeeId: "EMP-0921",
    sessionId: "SESSION-2B44C9",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    action: "DELETE",
    module: "Media Library",
    target: "banner-old.jpg",
    description: "Deleted unused media asset",
    status: "FAILED"
  }
];

export function getSessionData() {
  if (typeof window === "undefined") return { employeeId: null, sessionId: null };
  return {
    employeeId: localStorage.getItem("opsai_employee_id"),
    sessionId: localStorage.getItem("opsai_session_id"),
  };
}

export function setSessionData(employeeId: string, sessionId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("opsai_employee_id", employeeId);
  localStorage.setItem("opsai_session_id", sessionId);
}

export function clearSessionData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("opsai_employee_id");
  localStorage.removeItem("opsai_session_id");
}

export function getActivities(): AuditActivity[] {
  if (typeof window === "undefined") return INITIAL_ACTIVITIES;
  const stored = localStorage.getItem("opsai_audit_activities");
  if (!stored) {
    localStorage.setItem("opsai_audit_activities", JSON.stringify(INITIAL_ACTIVITIES));
    return INITIAL_ACTIVITIES;
  }
  return JSON.parse(stored);
}

export function logActivity(
  activity: Omit<AuditActivity, "id" | "employeeId" | "sessionId" | "timestamp">
) {
  if (typeof window === "undefined") return;
  const { employeeId, sessionId } = getSessionData();
  
  if (!employeeId || !sessionId) {
    console.warn("Attempted to log activity without active session");
    return;
  }

  const newActivity: AuditActivity = {
    ...activity,
    id: `ACT-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
    employeeId,
    sessionId,
    timestamp: new Date().toISOString(),
  };

  const current = getActivities();
  const updated = [newActivity, ...current];
  localStorage.setItem("opsai_audit_activities", JSON.stringify(updated));
}
