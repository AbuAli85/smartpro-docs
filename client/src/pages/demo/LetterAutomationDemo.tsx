import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RefreshCw, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { setSEOTags } from "@/lib/seoUtils";

// ------------------------------------------------------------
// Smartpro Letter Builder – UI + Variable Mapping (React)
// ------------------------------------------------------------
// Updates (layout + types + titles):
// - Added Recipient Role (General Manager, Director, Minister, Dept. Head, Custom)
// - Added Recipient Name/Org and Letter Title fields
// - Dynamic per-entity letter types list
// - Renderer now formats "To:" line based on role + language (AR/EN)
// - Subject auto-falls back to Letter Title if subject is empty
// - Preserved clipboard fix + dev runtime tests
// ------------------------------------------------------------

// ---------- Dictionaries ----------
const LETTER_TYPES: Record<string, { value: string; label: string }[]> = {
  MOCI: [
    { value: "NOC", label: "NOC" },
    { value: "Inquiry", label: "Inquiry" },
    { value: "Update", label: "Update Request" },
  ],
  ROP: [
    { value: "Verification", label: "Verification" },
    { value: "Clearance", label: "Clearance" },
  ],
  MOL: [
    { value: "LabourClearance", label: "Labour Clearance" },
    { value: "EmploymentConfirmation", label: "Employment Confirmation" },
  ],
};

type Lang = "ar" | "en";

type RecipientRole =
  | "general_manager"
  | "director"
  | "minister"
  | "department_head"
  | "custom";

function roleLabel(lang: Lang, role: RecipientRole) {
  const ar: Record<RecipientRole, string> = {
    general_manager: "المدير العام",
    director: "المدير",
    minister: "معالي الوزير",
    department_head: "رئيس القسم",
    custom: "",
  };
  const en: Record<RecipientRole, string> = {
    general_manager: "General Manager",
    director: "Director",
    minister: "Minister",
    department_head: "Department Head",
    custom: "",
  };
  return (lang === "ar" ? ar : en)[role] || "";
}

// ---------- Utilities ----------
export function formatDate(d: string) {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  if (!y || !m || !day) return d;
  return `${day}/${m}/${y}`;
}

async function copyToClipboard(text: string): Promise<{ ok: boolean; method: "clipboard" | "fallback"; error?: unknown }>{
  try {
    const isSecure = typeof window !== "undefined" && window.isSecureContext;
    if (isSecure && navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return { ok: true, method: "clipboard" };
    }
    throw new Error("Clipboard API unavailable or insecure context");
  } catch (err) {
    try {
      if (typeof document === "undefined") throw err;
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (!ok) throw err;
      return { ok: true, method: "fallback" };
    } catch (err2) {
      return { ok: false, method: "fallback", error: err2 ?? err };
    }
  }
}

// ---------- Renderer ----------
export function renderLetter({
  entity,
  letterType,
  lang,
  authorityLevel,
  values,
}: {
  entity: string;
  letterType: string;
  lang: Lang;
  authorityLevel: string;
  values: Record<string, string>;
}) {
  const date = lang === "ar" ? `التاريخ: ${formatDate(values.date || "")}` : `Date: ${values.date || ""}`;

  const headers = {
    ar: { company: "سمارت برو للأعمال والخدمات", sincerely: "وتفضلوا بقبول فائق الاحترام" },
    en: { company: "Smartpro Business Hub & Services", sincerely: "Sincerely" },
  } as const;

  const commonFooter =
    lang === "ar"
      ? `${headers.ar.company}\nمسقط، سلطنة عمان\nwww.smartprohub.com | support@smartprohub.com`
      : `${headers.en.company}\nMuscat, Oman\nwww.smartprohub.com | support@smartprohub.com`;

  const targetOrg = values.recipient_org || (entity === "MOCI" ? (lang === "ar" ? "وزارة التجارة والصناعة وترويج الاستثمار" : "MOCI") : entity);
  const role = values.recipient_role as RecipientRole;
  const roleText = role === "custom" ? (values.custom_recipient_role || "") : roleLabel(lang, role as RecipientRole);
  const toLine = lang === "ar"
    ? `إلى: ${roleText ? roleText + " – " : ""}${targetOrg}`
    : `To: ${roleText ? roleText + ", " : ""}${targetOrg}`;

  const subjectValue = values.subject || values.letter_title || "";

  // --- MOCI: NOC / Inquiry / Update ---
  if (entity === "MOCI" && letterType === "NOC") {
    if (lang === "ar") {
      return [
        headers.ar.company,
        date,
        toLine,
        `الموضوع: ${subjectValue || "خطاب عدم ممانعة"}`,
        "تحية طيبة وبعد،",
        authorityLevel === "authorized_signatory"
          ? `نحن، شركة ${values.company_name} (رقم السجل التجاري: ${values.company_cr})، لا نمانع في ${values.noc_purpose || "الغرض المذكور"} للموظف ${values.employee_name} (رقم البطاقة المدنية ${values.civil_id}).`
          : `نؤكد بأن ${values.employee_name} يعمل لدينا منذ ${values.employment_start_date} بقسم ${values.department}، ونصدر هذا الخطاب بناءً على طلبه.`,
        `${headers.ar.sincerely}،`,
        `${values.signer_name} – ${values.signer_title}`,
        commonFooter,
      ].join("\n\n");
    }
    return [
      headers.en.company,
      date,
      toLine,
      `Subject: ${subjectValue || "No-Objection Certificate (NOC)"}`,
      "Dear Sir/Madam,",
      authorityLevel === "authorized_signatory"
        ? `We, ${values.company_name} (CR: ${values.company_cr}), hereby issue a No-Objection Certificate for ${values.employee_name} (Civil ID ${values.civil_id}) for the purpose of ${values.noc_purpose || "the stated activity"}.`
        : `${values.employee_name} has been employed with us since ${values.employment_start_date} in ${values.department}. This letter is issued upon request.`,
      `${headers.en.sincerely},`,
      `${values.signer_name} – ${values.signer_title}`,
      commonFooter,
    ].join("\n\n");
  }

  if (entity === "MOCI" && letterType === "Inquiry") {
    if (lang === "ar") {
      return [
        headers.ar.company,
        date,
        toLine,
        `الموضوع: ${subjectValue || "استفسار تنظيمي"}`,
        `نرجو إفادتنا بشأن ${values.request_details || "الموضوع المذكور"}. شركة ${values.company_name} (السجل التجاري ${values.company_cr}).`,
        `${headers.ar.sincerely}،`,
        `${values.signer_name} – ${values.signer_title}`,
        commonFooter,
      ].join("\n\n");
    }
    return [
      headers.en.company,
      date,
      toLine,
      `Subject: ${subjectValue || "Regulatory Inquiry"}`,
      `We request guidance regarding ${values.request_details || "the stated matter"}. Company: ${values.company_name} (CR: ${values.company_cr}).`,
      `${headers.en.sincerely},`,
      `${values.signer_name} – ${values.signer_title}`,
      commonFooter,
    ].join("\n\n");
  }

  if (entity === "MOCI" && letterType === "Update") {
    if (lang === "ar") {
      return [headers.ar.company, date, toLine, `الموضوع: ${subjectValue || "طلب تحديث"}`,
        `نود إحاطتكم علماً بـ ${values.request_details || "المستجدات"} المتعلقة بشركتنا ${values.company_name} (السجل التجاري ${values.company_cr}).`,
        `${headers.ar.sincerely}،`, `${values.signer_name} – ${values.signer_title}`, commonFooter].join("\n\n");
    }
    return [headers.en.company, date, toLine, `Subject: ${subjectValue || "Update Request"}`,
      `We would like to inform you of ${values.request_details || "recent updates"} regarding ${values.company_name} (CR: ${values.company_cr}).`,
      `${headers.en.sincerely},`, `${values.signer_name} – ${values.signer_title}`, commonFooter].join("\n\n");
  }

  // --- ROP: Verification / Clearance ---
  if (entity === "ROP" && letterType === "Verification") {
    if (lang === "ar") {
      return [
        headers.ar.company,
        date,
        toLine,
        `الموضوع: ${subjectValue || "خطاب تحقق"}`,
        `نفيدكم بأن ${values.employee_name} يعمل لدينا، ونرفق بياناته لغرض التحقق.`,
        `${headers.ar.sincerely}،`,
        `${values.signer_name} – ${values.signer_title}`,
        commonFooter,
      ].join("\n\n");
    }
    return [
      headers.en.company,
      date,
      toLine,
      `Subject: ${subjectValue || "Employment Verification"}`,
      `This is to confirm that ${values.employee_name} is employed with us. Details enclosed for verification.`,
      `${headers.en.sincerely},`,
      `${values.signer_name} – ${values.signer_title}`,
      commonFooter,
    ].join("\n\n");
  }

  if (entity === "ROP" && letterType === "Clearance") {
    if (lang === "ar") {
      return [headers.ar.company, date, toLine, `الموضوع: ${subjectValue || "طلب إفادة/خلو طرف"}`,
        `نلتمس تفضلكم بإصدار إفادة/خلو طرف بخصوص ${values.request_details || "المذكور"}.`,
        `${headers.ar.sincerely}،`, `${values.signer_name} – ${values.signer_title}`, commonFooter].join("\n\n");
    }
    return [headers.en.company, date, toLine, `Subject: ${subjectValue || "Clearance Request"}`,
      `We kindly request the issuance of a clearance regarding ${values.request_details || "the subject matter"}.`,
      `${headers.en.sincerely},`, `${values.signer_name} – ${values.signer_title}`, commonFooter].join("\n\n");
  }

  // --- MOL: Labour Clearance / Employment Confirmation ---
  if (entity === "MOL" && letterType === "LabourClearance") {
    if (lang === "ar") {
      return [
        headers.ar.company,
        date,
        toLine,
        `الموضوع: ${subjectValue || "طلب موافقة عمل"}`,
        `نلتمس تفضلكم بالموافقة على إجراءات تصريح العمل للموظف ${values.employee_name}، رقم البطاقة المدنية ${values.civil_id}.`,
        `${headers.ar.sincerely}،`,
        `${values.signer_name} – ${values.signer_title}`,
        commonFooter,
      ].join("\n\n");
    }
    return [
      headers.en.company,
      date,
      toLine,
      `Subject: ${subjectValue || "Labour Clearance Request"}`,
      `We kindly request approval to proceed with a labour permit for ${values.employee_name} (Civil ID ${values.civil_id}).`,
      `${headers.en.sincerely},`,
      `${values.signer_name} – ${values.signer_title}`,
      commonFooter,
    ].join("\n\n");
  }

  if (entity === "MOL" && letterType === "EmploymentConfirmation") {
    if (lang === "ar") {
      return [headers.ar.company, date, toLine, `الموضوع: ${subjectValue || "تأكيد توظيف"}`,
        `نفيدكم بأن ${values.employee_name} يعمل لدينا منذ ${values.employment_start_date} في قسم ${values.department}.`,
        `${headers.ar.sincerely}،`, `${values.signer_name} – ${values.signer_title}`, commonFooter].join("\n\n");
    }
    return [headers.en.company, date, toLine, `Subject: ${subjectValue || "Employment Confirmation"}`,
      `${values.employee_name} has been employed with us since ${values.employment_start_date} in ${values.department}.`,
      `${headers.en.sincerely},`, `${values.signer_name} – ${values.signer_title}`, commonFooter].join("\n\n");
  }

  // Fallback
  return lang === "ar"
    ? `${headers.ar.company}\n${date}\n\n(يرجى إكمال الحقول لاختيار النموذج المناسب)`
    : `${headers.en.company}\n${date}\n\n(Please fill the fields to choose the correct template)`;
}

export default function LetterAutomationDemo() {
  useEffect(() => {
    setSEOTags({
      title: "Letter Automation Demo | TheSmartPro.io - Interactive Builder",
      description: "Try our interactive letter automation builder. Generate professional government letters for MOCI, ROP, and MOL in Arabic and English with smart templates.",
      keywords: "letter automation, government letters, NOC generator, letter builder, automation demo",
      type: "website",
      url: "https://thesmartpro.io/demo/letter-automation",
    });
  }, []);

  const [entity, setEntity] = useState("MOCI");
  const [letterType, setLetterType] = useState("NOC");
  const [lang, setLang] = useState<Lang>("ar");
  const [authorityLevel, setAuthorityLevel] = useState("authorized_signatory");
  const [recipientRole, setRecipientRole] = useState<RecipientRole>("general_manager");

  const entityTypes = LETTER_TYPES[entity] || [];
  useEffect(() => {
    if (!entityTypes.find((t) => t.value === letterType)) {
      setLetterType(entityTypes[0]?.value || "NOC");
    }
  }, [entity]);

  const [values, setValues] = useState<Record<string, string>>({
    date: new Date().toISOString().slice(0, 10),
    letter_title: "",
    subject: "",
    request_details: "",
    employee_name: "",
    civil_id: "",
    employment_start_date: "",
    department: "",
    noc_purpose: "",
    company_name: "Smartpro Business Hub & Services",
    company_cr: "CR-12345-OM",
    signer_name: "Abu Ali",
    signer_title: "Managing Director",
    recipient_name: "",
    recipient_org: "",
    recipient_role: recipientRole,
    custom_recipient_role: "",
  });

  useEffect(() => {
    setValues((v) => ({ ...v, recipient_role: recipientRole }));
  }, [recipientRole]);

  const payload = useMemo(
    () => ({
      template_id: `gov_${entity.toLowerCase()}_${letterType.toLowerCase()}_${lang}_v1`,
      format: "pdf",
      lang,
      inputs: {
        authority_level: authorityLevel,
        ...values,
      },
    }),
    [entity, letterType, lang, authorityLevel, values]
  );

  const preview = useMemo(
    () => renderLetter({ entity, letterType, lang, authorityLevel, values }),
    [entity, letterType, lang, authorityLevel, values]
  );

  const [copyMsg, setCopyMsg] = useState<null | { ok: boolean; text: string }>(null);
  const showCopyMsg = (ok: boolean, text: string) => {
    setCopyMsg({ ok, text });
    window.setTimeout(() => setCopyMsg(null), 2000);
  };

  const handleCopy = async (text: string) => {
    const res = await copyToClipboard(text);
    if (res.ok) {
      showCopyMsg(true, res.method === "clipboard" ? "Copied" : "Copied (fallback)");
    } else {
      console.error("Copy failed", res.error);
      showCopyMsg(false, "Copy failed");
    }
  };

  const reset = () => {
    setEntity("MOCI");
    setLetterType("NOC");
    setLang("ar");
    setAuthorityLevel("authorized_signatory");
    setRecipientRole("general_manager");
    setValues({
      date: new Date().toISOString().slice(0, 10),
      letter_title: "",
      subject: "",
      request_details: "",
      employee_name: "",
      civil_id: "",
      employment_start_date: "",
      department: "",
      noc_purpose: "",
      company_name: "Smartpro Business Hub & Services",
      company_cr: "CR-12345-OM",
      signer_name: "Abu Ali",
      signer_title: "Managing Director",
      recipient_name: "",
      recipient_org: "",
      recipient_role: "general_manager",
      custom_recipient_role: "",
    });
  };

  // --------- Dev tests (basic runtime checks) ---------
  useEffect(() => {
    console.assert(formatDate("2025-11-11") === "11/11/2025", "formatDate failed");
    const sample = renderLetter({
      entity: "X",
      letterType: "Y",
      lang: "en",
      authorityLevel: "authorized_signatory",
      values: { date: "2025-11-11" } as any,
    });
    console.assert(sample.includes("Smartpro Business Hub & Services"), "renderLetter header missing");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Letter Automation Builder</h1>
              <p className="text-sm text-gray-600">Interactive demo of workflow automation capabilities</p>
            </div>
            <Link href="/docs/workflow-automation">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Docs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left: Form */}
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Configuration</h2>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={reset}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                  <Button onClick={() => handleCopy(JSON.stringify(payload, null, 2))}>
                    <Copy className="w-4 h-4 mr-2" /> Copy JSON
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Entity</Label>
                  <Select value={entity} onValueChange={setEntity}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MOCI">MOCI</SelectItem>
                      <SelectItem value="ROP">ROP</SelectItem>
                      <SelectItem value="MOL">MOL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Letter Type</Label>
                  <Select value={letterType} onValueChange={setLetterType}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(LETTER_TYPES[entity] || []).map((t) => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Language</Label>
                  <Select value={lang} onValueChange={(v) => setLang(v as Lang)}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Authority Level</Label>
                  <Select value={authorityLevel} onValueChange={setAuthorityLevel}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="authorized_signatory">Authorized Signatory</SelectItem>
                      <SelectItem value="hr_manager">HR Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Recipient Role</Label>
                  <Select value={recipientRole} onValueChange={(v) => setRecipientRole(v as RecipientRole)}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general_manager">General Manager / المدير العام</SelectItem>
                      <SelectItem value="director">Director / المدير</SelectItem>
                      <SelectItem value="minister">Minister / معالي الوزير</SelectItem>
                      <SelectItem value="department_head">Department Head / رئيس القسم</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {recipientRole === "custom" && (
                  <div>
                    <Label>Custom Recipient Role</Label>
                    <Input value={values.custom_recipient_role} onChange={(e) => setValues(v => ({...v, custom_recipient_role: e.target.value}))}/>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Recipient Name (optional)</Label>
                  <Input value={values.recipient_name} onChange={(e) => setValues(v => ({...v, recipient_name: e.target.value}))}/>
                </div>
                <div>
                  <Label>Recipient Organization</Label>
                  <Input value={values.recipient_org} onChange={(e) => setValues(v => ({...v, recipient_org: e.target.value}))}/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Letter Title</Label>
                  <Input value={values.letter_title} onChange={(e) => setValues(v => ({...v, letter_title: e.target.value}))}/>
                </div>
                <div>
                  <Label>Subject</Label>
                  <Input value={values.subject} onChange={(e) => setValues(v => ({...v, subject: e.target.value}))}/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Input type="date" value={values.date} onChange={(e) => setValues(v => ({...v, date: e.target.value}))}/>
                </div>
                <div className="md:col-span-1">
                  <Label>Request Details / NOC Purpose</Label>
                  <Textarea value={values.request_details || values.noc_purpose} onChange={(e) => setValues(v => ({...v, request_details: e.target.value, noc_purpose: e.target.value}))}/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Employee Name</Label>
                  <Input value={values.employee_name} onChange={(e) => setValues(v => ({...v, employee_name: e.target.value}))}/>
                </div>
                <div>
                  <Label>Civil ID</Label>
                  <Input value={values.civil_id} onChange={(e) => setValues(v => ({...v, civil_id: e.target.value}))}/>
                </div>
                <div>
                  <Label>Employment Start Date</Label>
                  <Input type="date" value={values.employment_start_date} onChange={(e) => setValues(v => ({...v, employment_start_date: e.target.value}))}/>
                </div>
                <div>
                  <Label>Department</Label>
                  <Input value={values.department} onChange={(e) => setValues(v => ({...v, department: e.target.value}))}/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Company Name</Label>
                  <Input value={values.company_name} onChange={(e) => setValues(v => ({...v, company_name: e.target.value}))}/>
                </div>
                <div>
                  <Label>CR Number</Label>
                  <Input value={values.company_cr} onChange={(e) => setValues(v => ({...v, company_cr: e.target.value}))}/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Signer Name</Label>
                  <Input value={values.signer_name} onChange={(e) => setValues(v => ({...v, signer_name: e.target.value}))}/>
                </div>
                <div>
                  <Label>Signer Title</Label>
                  <Input value={values.signer_title} onChange={(e) => setValues(v => ({...v, signer_title: e.target.value}))}/>
                </div>
              </div>

              <div>
                <Label>Raw JSON Payload (for /v1/generate)</Label>
                <pre className="mt-2 p-4 bg-muted rounded-xl overflow-auto text-xs max-h-64">{JSON.stringify(payload, null, 2)}</pre>
              </div>

              {copyMsg && (
                <div className={`flex items-center gap-2 text-sm ${copyMsg.ok ? "text-green-700" : "text-red-700"}`}>
                  {copyMsg.ok ? <CheckCircle2 className="w-4 h-4"/> : <AlertCircle className="w-4 h-4"/>}
                  <span>{copyMsg.text}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right: Live Preview */}
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-0">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Live Preview</h2>
                  <p className="text-sm text-muted-foreground">Auto-generated letter content (demo renderer)</p>
                </div>
                <div className="p-6">
                  <div
                    className={`whitespace-pre-wrap bg-white rounded-xl p-6 shadow-inner min-h-[480px] leading-8 ${
                      lang === "ar" ? "text-right" : "text-left"
                    } ${lang === "ar" ? "[direction:rtl]" : "[direction:ltr]"}`}
                  >
                    {preview}
                  </div>
                </div>
                <div className="p-6 pt-0 flex gap-2">
                  <Button onClick={() => handleCopy(preview)}><Copy className="w-4 h-4 mr-2"/>Copy Letter Text</Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

