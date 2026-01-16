import React from 'react';
import { useAppStore } from '@/store/appStore';
import { formatDate } from '@/utils/validation';
import { CheckCircle, AlertCircle } from 'lucide-react';

const AuditLog: React.FC = () => {
  const { auditLog } = useAppStore();

  if (auditLog.length === 0) {
    return (
      <div className="bg-github-lighter border border-github-border rounded-lg p-12 text-center">
        <p className="text-github-text/70">No audit log entries yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {auditLog.map((log, index) => (
        <div
          key={index}
          className="bg-github-lighter border border-github-border rounded-lg p-4 flex items-start gap-4"
        >
          <div className="pt-1">
            {log.status === 'success' ? (
              <CheckCircle className="h-5 w-5 text-github-success" />
            ) : (
              <AlertCircle className="h-5 w-5 text-github-danger" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-github-text font-semibold">
                  {log.action.toUpperCase()} - {log.secret}
                </p>
                <p className="text-github-text/60 text-sm mt-1">
                  {log.message || 'Operation completed successfully'}
                </p>
              </div>
              <p className="text-github-text/50 text-xs whitespace-nowrap">
                {formatDate(log.timestamp)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuditLog;