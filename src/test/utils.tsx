import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Create a custom render function that includes common providers
const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                cacheTime: 0,
            },
            mutations: {
                retry: false,
            },
        },
    });

interface AllTheProvidersProps {
    children: ReactNode;
}

function AllTheProviders({ children }: AllTheProvidersProps) {
    const testQueryClient = createTestQueryClient();

    return (
        <QueryClientProvider client={testQueryClient}>
            <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
    );
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Helper to create mock functions
export const createMockFunction = <T extends (...args: any[]) => any>(
    implementation?: T
): jest.Mock<ReturnType<T>, Parameters<T>> => {
    return vi.fn(implementation) as any;
};

// Helper for async utilities
export const waitForLoadingToFinish = () =>
    new Promise(resolve => setTimeout(resolve, 0));
