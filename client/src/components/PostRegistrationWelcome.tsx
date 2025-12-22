import { useEffect, useState } from "react";
import { CheckCircle2, FileText, Users, Calendar, MessageSquare, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { getLeadStatus, trackLead, LeadStage } from "@/lib/leadTrackingApi";
import { trackEvent } from "@/lib/googleAnalytics";

interface PostRegistrationWelcomeProps {
  submissionId?: string;
  email?: string;
  userId?: string;
  accountType?: 'provider' | 'client';
  className?: string;
}

export function PostRegistrationWelcome({
  submissionId,
  email,
  userId,
  accountType = 'client',
  className,
}: PostRegistrationWelcomeProps) {
  const { t, language } = useLanguage();
  const [leadStatus, setLeadStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeWelcome = async () => {
      if (!submissionId) {
        setLoading(false);
        return;
      }

      try {
        // Track registration completed if we have userId
        if (userId && email) {
          await trackLead({
            submissionId,
            email,
            stage: LeadStage.REGISTRATION_COMPLETED,
            metadata: {
              platform_user_id: userId,
              account_type: accountType,
              registered_at: new Date().toISOString(),
            },
          });

          trackEvent('registration_completed', {
            submission_id: submissionId,
            user_id: userId,
            account_type: accountType,
          });
        }

        // Fetch current lead status
        const status = await getLeadStatus(submissionId);
        if (status) {
          setLeadStatus(status);
        }
      } catch (error) {
        console.error('Error initializing welcome:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeWelcome();
  }, [submissionId, email, userId, accountType]);

  if (loading) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  const nextSteps = accountType === 'client' 
    ? [
        {
          icon: FileText,
          title: t('postRegistration.client.completeProfile.title') || 'Complete Your Profile',
          description: t('postRegistration.client.completeProfile.description') || 'Add your business details and preferences',
          action: t('postRegistration.client.completeProfile.action') || 'Go to Profile',
          href: '/profile',
        },
        {
          icon: Users,
          title: t('postRegistration.client.findProviders.title') || 'Find Service Providers',
          description: t('postRegistration.client.findProviders.description') || 'Browse verified professionals for your needs',
          action: t('postRegistration.client.findProviders.action') || 'Browse Providers',
          href: '/providers',
        },
        {
          icon: MessageSquare,
          title: t('postRegistration.client.viewConsultation.title') || 'View Your Consultation',
          description: t('postRegistration.client.viewConsultation.description') || 'Track your consultation request status',
          action: t('postRegistration.client.viewConsultation.action') || 'View Details',
          href: `/consultation/status/${submissionId}`,
        },
        {
          icon: Calendar,
          title: t('postRegistration.client.bookService.title') || 'Book Your First Service',
          description: t('postRegistration.client.bookService.description') || 'Get started with your business needs',
          action: t('postRegistration.client.bookService.action') || 'Book Now',
          href: '/services',
        },
      ]
    : [
        {
          icon: FileText,
          title: t('postRegistration.provider.completeProfile.title') || 'Complete Your Provider Profile',
          description: t('postRegistration.provider.completeProfile.description') || 'Add your services, portfolio, and credentials',
          action: t('postRegistration.provider.completeProfile.action') || 'Go to Profile',
          href: '/profile',
        },
        {
          icon: Users,
          title: t('postRegistration.provider.setupServices.title') || 'Set Up Your Services',
          description: t('postRegistration.provider.setupServices.description') || 'Add services you offer and pricing',
          action: t('postRegistration.provider.setupServices.action') || 'Add Services',
          href: '/services/setup',
        },
        {
          icon: Calendar,
          title: t('postRegistration.provider.setAvailability.title') || 'Set Your Availability',
          description: t('postRegistration.provider.setAvailability.description') || 'Define when clients can book you',
          action: t('postRegistration.provider.setAvailability.action') || 'Set Schedule',
          href: '/availability',
        },
        {
          icon: TrendingUp,
          title: t('postRegistration.provider.startEarning.title') || 'Start Earning',
          description: t('postRegistration.provider.startEarning.description') || 'Get your first booking and start earning',
          action: t('postRegistration.provider.startEarning.action') || 'View Dashboard',
          href: '/dashboard',
        },
      ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Welcome Message */}
      <Card className="p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t('postRegistration.welcome.title') || 'Welcome to the Platform!'}
              </h2>
            </div>
            <p className="text-lg text-gray-700 mb-4">
              {t('postRegistration.welcome.message') || 'Your account has been successfully created. Your consultation request has been linked to your account.'}
            </p>
            {leadStatus && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>
                  {t('postRegistration.welcome.progress') || 'Your Progress'}: <strong>{leadStatus.progress}%</strong>
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Consultation Status */}
      {submissionId && (
        <Card className="p-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">
              {t('postRegistration.consultationStatus.title') || 'Your Consultation Request'}
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                {t('postRegistration.consultationStatus.submissionId') || 'Submission ID'}
              </span>
              <span className="font-mono text-sm font-semibold text-gray-900">
                {submissionId.length > 20 ? `${submissionId.slice(0, 8)}...${submissionId.slice(-8)}` : submissionId}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                {t('postRegistration.consultationStatus.status') || 'Status'}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {t('postRegistration.consultationStatus.active') || 'Active'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              {t('postRegistration.consultationStatus.message') || 'Our team will review your consultation request and contact you within 24 hours. You can track the status in your dashboard.'}
            </p>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => {
                trackEvent('view_consultation_details', {
                  submission_id: submissionId,
                  user_id: userId,
                });
                window.location.href = `/consultation/status/${submissionId}`;
              }}
            >
              {t('postRegistration.consultationStatus.viewDetails') || 'View Full Details'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* Next Steps */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {t('postRegistration.nextSteps.title') || 'What\'s Next?'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {nextSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group"
                onClick={() => {
                  trackEvent('post_registration_next_step_click', {
                    step: step.title,
                    account_type: accountType,
                    submission_id: submissionId,
                  });
                  if (step.href.startsWith('http')) {
                    window.open(step.href, '_blank');
                  } else {
                    window.location.href = step.href;
                  }
                }}
              >
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    {step.action}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Follow-up Information */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-start gap-3">
          <MessageSquare className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {t('postRegistration.followUp.title') || 'We\'ll Follow Up With You'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>{t('postRegistration.followUp.email') || 'You\'ll receive an email confirmation shortly'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>{t('postRegistration.followUp.consultation') || 'Our team will contact you about your consultation within 24 hours'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>{t('postRegistration.followUp.dashboard') || 'Track everything in your dashboard'}</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

