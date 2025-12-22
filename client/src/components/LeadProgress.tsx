import { useState, useEffect } from "react";
import { CheckCircle2, Circle, ArrowRight, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/googleAnalytics";
import { getLeadStatus, trackLead, LeadStage } from "@/lib/leadTrackingApi";

interface LeadProgressProps {
  submissionId?: string;
  email?: string;
  className?: string;
}

interface LeadStage {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export function LeadProgress({ submissionId, email, className }: LeadProgressProps) {
  const { t, language } = useLanguage();
  const [stages, setStages] = useState<LeadStage[]>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!submissionId) {
      setLoading(false);
      return;
    }

    // Fetch lead status and track consultation viewed
    const initializeLeadTracking = async () => {
      try {
        // Track consultation viewed
        if (email) {
          await trackLead({
            submissionId,
            email,
            stage: LeadStage.CONSULTATION_VIEWED,
            metadata: {
              page: 'thank_you',
              timestamp: new Date().toISOString(),
            },
          });

          trackEvent('lead_progress', {
            submission_id: submissionId,
            stage: 'consultation_viewed',
          });
        }

        // Fetch current lead status
        const leadStatus = await getLeadStatus(submissionId);
        if (leadStatus) {
          updateStages(leadStatus.stages || [], leadStatus.currentStage);
          setProgress(leadStatus.progress || 0);
        } else {
          // Default stages if no lead found
          updateStages(['consultation_submitted', 'consultation_viewed'], 'consultation_viewed');
          setProgress(33);
        }
      } catch (error) {
        console.error('Error initializing lead tracking:', error);
        // Set default stages on error
        updateStages(['consultation_submitted', 'consultation_viewed'], 'consultation_viewed');
        setProgress(33);
      } finally {
        setLoading(false);
      }
    };

    initializeLeadTracking();
  }, [submissionId, email]);

  const updateStages = (completedStages: string[], currentStage: string) => {
    const allStages: LeadStage[] = [
      {
        id: 'consultation_submitted',
        label: t('lead.stage.consultationSubmitted') || 'Consultation Submitted',
        description: t('lead.stage.consultationSubmittedDesc') || 'Your consultation request has been received',
        completed: completedStages.includes('consultation_submitted'),
        current: currentStage === 'consultation_submitted',
      },
      {
        id: 'consultation_viewed',
        label: t('lead.stage.consultationViewed') || 'Thank You Page Viewed',
        description: t('lead.stage.consultationViewedDesc') || 'You viewed the confirmation page',
        completed: completedStages.includes('consultation_viewed'),
        current: currentStage === 'consultation_viewed',
      },
      {
        id: 'registration_started',
        label: t('lead.stage.registrationStarted') || 'Registration Started',
        description: t('lead.stage.registrationStartedDesc') || 'You started creating your account',
        completed: completedStages.includes('registration_started'),
        current: currentStage === 'registration_started',
      },
      {
        id: 'registration_completed',
        label: t('lead.stage.registrationCompleted') || 'Account Created',
        description: t('lead.stage.registrationCompletedDesc') || 'Your account has been successfully created',
        completed: completedStages.includes('registration_completed'),
        current: currentStage === 'registration_completed',
      },
      {
        id: 'profile_completed',
        label: t('lead.stage.profileCompleted') || 'Profile Completed',
        description: t('lead.stage.profileCompletedDesc') || 'Your profile is fully set up',
        completed: completedStages.includes('profile_completed'),
        current: currentStage === 'profile_completed',
      },
      {
        id: 'first_service_booked',
        label: t('lead.stage.firstServiceBooked') || 'First Service Booked',
        description: t('lead.stage.firstServiceBookedDesc') || 'You booked your first service',
        completed: completedStages.includes('first_service_booked'),
        current: currentStage === 'first_service_booked',
      },
    ];

    setStages(allStages);
  };

  if (loading || !submissionId) {
    return null;
  }

  return (
    <Card className={cn("p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200 shadow-lg", className)}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {t('lead.progress.title') || 'Your Journey Progress'}
              </h3>
              <p className="text-sm text-gray-600">
                {t('lead.progress.subtitle') || 'Track your progress from consultation to active user'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-600">{progress}%</div>
            <div className="text-xs text-gray-600">{t('lead.progress.complete') || 'Complete'}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stages */}
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={stage.id} className="relative">
              {/* Connector Line */}
              {index < stages.length - 1 && (
                <div
                  className={cn(
                    "absolute left-5 top-10 w-0.5 h-8 transition-colors",
                    stage.completed ? "bg-green-500" : "bg-gray-300"
                  )}
                />
              )}

              {/* Stage Item */}
              <div
                className={cn(
                  "flex items-start gap-4 p-4 rounded-lg transition-all",
                  stage.completed && "bg-green-50 border border-green-200",
                  stage.current && !stage.completed && "bg-blue-50 border border-blue-200 ring-2 ring-blue-300",
                  !stage.completed && !stage.current && "bg-gray-50 border border-gray-200"
                )}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  {stage.completed ? (
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                  ) : stage.current ? (
                    <div className="p-2 bg-blue-100 rounded-full animate-pulse">
                      <Circle className="h-6 w-6 text-blue-600 fill-blue-600" />
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Circle className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      className={cn(
                        "font-semibold",
                        stage.completed && "text-green-900",
                        stage.current && !stage.completed && "text-blue-900",
                        !stage.completed && !stage.current && "text-gray-600"
                      )}
                    >
                      {stage.label}
                    </h4>
                    {stage.current && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        {t('lead.progress.current') || 'Current'}
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-sm",
                      stage.completed && "text-green-700",
                      stage.current && !stage.completed && "text-blue-700",
                      !stage.completed && !stage.current && "text-gray-500"
                    )}
                  >
                    {stage.description}
                  </p>
                </div>

                {/* Arrow */}
                {stage.completed && (
                  <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Next Step CTA */}
        {progress < 100 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-gray-700 mb-2">
              <strong>{t('lead.progress.nextStep') || 'Next Step'}:</strong>{' '}
              {stages.find((s) => !s.completed)?.label || t('lead.progress.completeJourney') || 'Complete your journey'}
            </p>
            <p className="text-xs text-gray-600">
              {t('lead.progress.continueMessage') || 'Continue to unlock more features and connect with providers'}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

