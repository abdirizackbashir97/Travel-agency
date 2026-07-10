import React from 'react';

const TermsCheckbox = ({ checked, onChange }) => {
  return (
    <label className="flex items-start gap-2 text-sm text-gray-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
        required
      />
      <span>
        I agree to the{' '}
        <a href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
          Terms & Conditions
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
          Privacy Policy
        </a>
      </span>
    </label>
  );
};

export default TermsCheckbox;
