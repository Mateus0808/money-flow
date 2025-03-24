'use client';

import clsx from 'clsx';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  error?: string
}

export const CustomDatePicker: React.FC<DatePickerProps> = ({ label, selected, onChange, error }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/aaaa"
        className={clsx(
          'w-full px-3 py-2 h-12 border rounded-lg dark:bg-transparent text-gray-700 dark:border-gray-700',
          'dark:text-textLight focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500'
        )}
      />
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};
