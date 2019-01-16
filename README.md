# 🤓 Angular - Unsubscribe For Pros 💪

> Declarative way to unsubscribe from observables when the component destroyed

## Installation

```bash
$ npm install @orchestrator/ngx-until-destroyed --save
```

## Usage

```ts
import { untilDestroyed } from '@orchestrator/ngx-until-destroyed';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
})
export class InboxComponent implements OnInit, OnDestroy {
  ngOnInit() {
    interval(1000)
      .pipe(untilDestroyed(this))
      .subscribe(val => console.log(val));
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }
}
```

### Use with decorator

```ts
import { WithUntilDestroyed } from '@orchestrator/ngx-until-destroyed';

@Component({...})
class MyComponent implements OnDestroy {
  @WithUntilDestroyed()
  stream$ = interval(1000); // You can safely subscribe to this everywhere

  // This method must be present, even if empty
  ngOnDestroy() {}
}
```

### Use with any class

```ts
import { untilDestroyed } from '@orchestrator/ngx-until-destroyed';

export class Widget {
  constructor() {
    interval(1000)
      .pipe(untilDestroyed(this, 'destroy'))
      .subscribe(console.log);
  }

  // The name needs to be the same as the decorator parameter
  destroy() {}
}
```
