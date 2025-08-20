export interface ToastPromise<T = any> {
  loading: string | { message: string; title?: string };
  success: string | { message: string; title?: string } | ((data: T) => string | { message: string; title?: string });
  error: string | { message: string; title?: string } | ((error: any) => string | { message: string; title?: string });
}

export class PromiseManager {
  private activePromises: Map<string, string> = new Map();

  async handlePromise<T>(
    promise: Promise<T>,
    options: ToastPromise<T>,
    showToast: (options: any) => string,
    updateToast: (id: string, options: any) => void
  ): Promise<T> {
    // Show loading toast
    const loadingText = typeof options.loading === 'string' 
      ? { message: options.loading }
      : options.loading;
    
    const toastId = showToast({
      ...loadingText,
      type: 'info',
      duration: 0,
      closable: false,
      icon: { html: '⏳' }
    });

    this.activePromises.set(promise as any, toastId);

    try {
      const result = await promise;
      
      // Show success toast
      const successText = typeof options.success === 'function'
        ? options.success(result)
        : options.success;
      
      const successOptions = typeof successText === 'string'
        ? { message: successText }
        : successText;

      updateToast(toastId, {
        ...successOptions,
        type: 'success',
        duration: 4000,
        closable: true,
        icon: { html: '✅' }
      });

      this.activePromises.delete(promise as any);
      return result;

    } catch (error) {
      // Show error toast
      const errorText = typeof options.error === 'function'
        ? options.error(error)
        : options.error;
      
      const errorOptions = typeof errorText === 'string'
        ? { message: errorText }
        : errorText;

      updateToast(toastId, {
        ...errorOptions,
        type: 'error',
        duration: 6000,
        closable: true,
        icon: { html: '❌' }
      });

      this.activePromises.delete(promise as any);
      throw error;
    }
  }

  getActivePromises(): string[] {
    return Array.from(this.activePromises.values());
  }

  cancelPromise(promise: any): void {
    const toastId = this.activePromises.get(promise);
    if (toastId) {
      this.activePromises.delete(promise);
      // Toast will be dismissed by the caller
    }
  }
}