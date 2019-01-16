import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

const UNTIL_DESTROYED_KEY = '__untilDestroyed__';

function getDestroyedSubjectOn(instance: object, method: string) {
  const originalDestroy = (instance as any)[method];

  if (!isFunction(originalDestroy)) {
    throw new Error(
      `${
        instance.constructor.name
      } is using untilDestroyed but doesn't implement ${method}`,
    );
  }

  let destroyed$: Subject<void> = (instance as any)[UNTIL_DESTROYED_KEY];

  if (!destroyed$) {
    destroyed$ = new Subject();

    Object.defineProperty(instance, UNTIL_DESTROYED_KEY, {
      configurable: true,
      enumerable: false,
      value: destroyed$,
    });

    (instance as any)[method] = function() {
      originalDestroy.apply(this, arguments);
      destroyed$.next();
      destroyed$.complete();
    };
  }

  return destroyed$;
}

/**
 * Unsubscribe from Observable when a Component/Class destroyed.
 *
 * @example
 * ```ts
 * @Component({...})
 * class MyComponent implements OnDestroy {
 *   stream$ = interval(100).pipe(untilDestroyed(this));
 *
 *   ngOnDestroy() {} // This method must be present on class
 * }
 * ```
 */
export function untilDestroyed<T>(
  instance: object,
  destroyMethodName = 'ngOnDestroy',
): MonoTypeOperatorFunction<T> {
  const destroyed$ = getDestroyedSubjectOn(instance, destroyMethodName);
  return source$ => source$.pipe(takeUntil(destroyed$));
}
