import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const NotificationSettings: React.FC = () => {
  const { t } = useTranslation();
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('settings.notifications')}</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.emailNotifications')}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.receiveUpdates')}</p>
          </div>
          <button 
            className={`relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out ${emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'} border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            onClick={() => setEmailNotifications(!emailNotifications)}
          >
            <span 
              className={`inline-block w-5 h-5 transition duration-200 ease-in-out transform ${emailNotifications ? 'translate-x-5' : 'translate-x-0'} bg-white rounded-full shadow pointer-events-none ring-0 dark:bg-gray-300`} 
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.pushNotifications')}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.receiveInstant')}</p>
          </div>
          <button 
            className={`relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out ${pushNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'} border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            onClick={() => setPushNotifications(!pushNotifications)}
          >
            <span 
              className={`inline-block w-5 h-5 transition duration-200 ease-in-out transform ${pushNotifications ? 'translate-x-5' : 'translate-x-0'} bg-white rounded-full shadow pointer-events-none ring-0`} 
            />
          </button>
        </div>
      </div>
    </div>
  );
};