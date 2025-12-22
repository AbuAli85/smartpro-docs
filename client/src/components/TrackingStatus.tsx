import { useState, useEffect } from "react";
import { CheckCircle2, Clock, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
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

  return (
    <Card className={cn("p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200", className)}>
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Package className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {t("tracking.title") || "Track Your Request"}
          </h3>
        </div>

        {submissionId && (
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {t("tracking.submissionId") || "Submission ID"}
                </p>
                <p className="font-mono text-base font-semibold text-gray-900">
                  {formatTrackingId(submissionId)}
                </p>
              </div>
              {executionId && (
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">
                    {t("tracking.executionId") || "Execution ID"}
                  </p>
                  <p className="font-mono text-xs text-gray-700">
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

