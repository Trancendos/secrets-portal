export const validateSecretName = (name: string): boolean => {
  // GitHub secret names: A-Z, 0-9, underscore
  return /^[A-Z_][A-Z0-9_]*$/.test(name);
};

export const validateSecretValue = (value: string): boolean => {
  return value.length > 0 && value.length <= 65536;
};

export const maskSecretValue = (value: string): string => {
  if (value.length <= 4) return '•'.repeat(value.length);
  return value.substring(0, 2) + '•'.repeat(value.length - 4) + value.substring(value.length - 2);
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[^a-zA-Z0-9_-]/g, '');
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};