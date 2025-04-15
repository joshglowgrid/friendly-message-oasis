
interface FormSubmission {
  type: 'contact_form' | 'call_request';
  data: Record<string, any>;
}

/**
 * Saves a form submission to localStorage
 */
export const saveFormSubmission = (type: FormSubmission['type'], data: Record<string, any>) => {
  try {
    const submissions = getFormSubmissions();
    submissions.push({
      type,
      data: {
        ...data,
        timestamp: new Date().toISOString()
      }
    });
    localStorage.setItem('form_submissions', JSON.stringify(submissions));
    return true;
  } catch (error) {
    console.error('Error saving form submission:', error);
    return false;
  }
};

/**
 * Gets all form submissions from localStorage
 */
export const getFormSubmissions = (): FormSubmission[] => {
  try {
    const submissions = localStorage.getItem('form_submissions');
    return submissions ? JSON.parse(submissions) : [];
  } catch (error) {
    console.error('Error getting form submissions:', error);
    return [];
  }
};

/**
 * Gets form submissions of a specific type
 */
export const getFormSubmissionsByType = (type: FormSubmission['type']): FormSubmission[] => {
  return getFormSubmissions().filter(submission => submission.type === type);
};

/**
 * Clears all form submissions from localStorage
 */
export const clearFormSubmissions = () => {
  try {
    localStorage.removeItem('form_submissions');
    return true;
  } catch (error) {
    console.error('Error clearing form submissions:', error);
    return false;
  }
};
