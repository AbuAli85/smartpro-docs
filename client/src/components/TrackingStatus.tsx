import { useState, useEffect } from "react";
import { CheckCircle2, Clock, Package, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface TrackingStatusProps {
  submissionId?: string;
  executionId?: string;
  className?: string;
}

interface TrackingStep {
  id: string;
  label: string;
  status: "completed" | "pending" | "in-progress";
  timestamp?: string;
}

export function TrackingStatus({ submissionId, executionId, className }: TrackingStatusProps) {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const [steps, setSteps] = useState<TrackingStep[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Initialize tracking steps
    const initialSteps: TrackingStep[] = [
      {
        id: "submitted",
        label: t("tracking.step.submitted") || "Request Submitted",
        status: "completed",
        timestamp: new Date().toISOString(),
      },
      {
        id: "received",
        label: t("tracking.step.received") || "Request Received",
        status: "completed",
        timestamp: new Date().toISOString(),
      },
      {
        id: "processing",
        label: t("tracking.step.processing") || "Processing Your Request",
        status: "in-progress",
      },
      {
        id: "reviewing",
        label: t("tracking.step.reviewing") || "Team Reviewing",
        status: "pending",
      },
      {
        id: "contacting",
        label: t("tracking.step.contacting") || "We'll Contact You Soon",
        status: "pending",
      },
    ];
    setSteps(initialSteps);
  }, [t]);

  const getStepIcon = (status: TrackingStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-600 animate-pulse" />;
      case "pending":
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatTrackingId = (id?: string) => {
    if (!id) return "N/A";
    // Format: SUB-XXXX-XXXX
    if (id.length > 12) {
      return `SUB-${id.slice(-8, -4).toUpperCase()}-${id.slice(-4).toUpperCase()}`;
    }
    return id.toUpperCase();
  };

  const copyTrackingId = async () => {
    if (!submissionId) return;
    
    try {
      const formattedId = formatTrackingId(submissionId);
      await navigator.clipboard.writeText(formattedId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy tracking ID:', error);
    }
  };

  return (
    <Card className={cn("p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-300 shadow-lg", className)}>
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {t("tracking.title") || "Track Your Request"}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {t("tracking.subtitle") || "Keep this ID for your records"}
            </p>
          </div>
        </div>

        {submissionId && (
          <div className="bg-white rounded-lg p-4 border-2 border-blue-300 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {t("tracking.submissionId") || "Submission ID"}
                </p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-lg font-bold text-gray-900 break-all">
                    {formatTrackingId(submissionId)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyTrackingId}
                    className="h-8 w-8 p-0 flex-shrink-0"
                    aria-label={copied ? (t("tracking.copied") || "Copied!") : (t("tracking.copy") || "Copy tracking ID")}
                    title={copied ? (t("tracking.copied") || "Copied!") : (t("tracking.copy") || "Copy tracking ID")}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-600" />
                    )}
                  </Button>
                </div>
                {copied && (
                  <p className="text-xs text-green-600 mt-1 animate-in fade-in">
                    {t("tracking.copied") || "Copied to clipboard!"}
                  </p>
                )}
              </div>
              {executionId && (
                <div className="text-right border-l border-gray-200 pl-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {t("tracking.executionId") || "Execution ID"}
                  </p>
                  <p className="font-mono text-sm font-semibold text-gray-700">
                    {executionId.slice(0, 8).toUpperCase()}...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-colors",
                step.status === "completed" && "bg-green-50 border border-green-200",
                step.status === "in-progress" && "bg-blue-50 border border-blue-200",
                step.status === "pending" && "bg-gray-50 border border-gray-200"
              )}
            >
              <div className="flex-shrink-0">{getStepIcon(step.status)}</div>
              <div className="flex-1">
                <p
                  className={cn(
                    "text-sm font-medium",
                    step.status === "completed" && "text-green-900",
                    step.status === "in-progress" && "text-blue-900",
                    step.status === "pending" && "text-gray-600"
                  )}
                >
                  {step.label}
                </p>
                {step.timestamp && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(step.timestamp).toLocaleString(language === "ar" ? "ar-SA" : "en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-100 rounded-lg p-4 border border-blue-300">
          <p className="text-sm text-blue-900">
            {t("tracking.note") ||
              "We typically respond within 24 hours. You'll receive an email confirmation shortly."}
          </p>
        </div>
      </div>
    </Card>
  );
}

