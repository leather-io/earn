/**
 * Environment variable validator
 * Validates that all required environment variables are present and valid
 */

interface EnvConfig {
    VITE_APP_VERSION: string;
    VITE_APP_COMMIT_SHA: string;
    VITE_SEGMENT_WRITE_KEY?: string;
    VITE_SENTRY_DSN?: string;
}

class EnvValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EnvValidationError';
    }
}

/**
 * Validates a required environment variable
 */
function validateRequired(key: string, value: string | undefined): string {
    if (!value || value.trim() === '') {
        throw new EnvValidationError(
            `Missing required environment variable: ${key}\n` +
            `Please check your .env file or environment configuration.\n` +
            `See .env.example for reference.`
        );
    }
    return value;
}

/**
 * Validates an optional environment variable
 */
function validateOptional(value: string | undefined): string | undefined {
    return value && value.trim() !== '' ? value : undefined;
}

/**
 * Validates all environment variables
 * Throws EnvValidationError if validation fails
 */
export function validateEnv(): EnvConfig {
    const errors: string[] = [];

    try {
        const config: EnvConfig = {
            VITE_APP_VERSION: validateRequired('VITE_APP_VERSION', import.meta.env.VITE_APP_VERSION),
            VITE_APP_COMMIT_SHA: validateRequired(
                'VITE_APP_COMMIT_SHA',
                import.meta.env.VITE_APP_COMMIT_SHA
            ),
            VITE_SEGMENT_WRITE_KEY: validateOptional(import.meta.env.VITE_SEGMENT_WRITE_KEY),
            VITE_SENTRY_DSN: validateOptional(import.meta.env.VITE_SENTRY_DSN),
        };

        // Log validation success in development
        if (import.meta.env.DEV) {
            console.log('✅ Environment variables validated successfully');
            console.log('Environment:', import.meta.env.MODE);
        }

        return config;
    } catch (error) {
        if (error instanceof EnvValidationError) {
            console.error('❌ Environment Validation Failed:');
            console.error(error.message);
            throw error;
        }
        throw error;
    }
}

/**
 * Gets a validated environment variable value
 */
export function getEnvVar(key: keyof EnvConfig): string | undefined {
    return import.meta.env[key];
}

/**
 * Checks if we're in development mode
 */
export function isDevelopment(): boolean {
    return import.meta.env.DEV;
}

/**
 * Checks if we're in production mode
 */
export function isProduction(): boolean {
    return import.meta.env.PROD;
}
