# 🤓 Angular - Unsubscribe For Pros 💪

[![Build Status](https://travis-ci.org/orchestratora/ngx-until-destroyed.svg?branch=master)](https://travis-ci.org/orchestratora/ngx-until-destroyed)
[![Coverage](https://img.shields.io/codecov/c/github/orchestratora/ngx-until-destroyed.svg?maxAge=2592000)](https://codecov.io/gh/orchestratora/ngx-until-destroyed)
[![Npm](https://img.shields.io/npm/v/@orchestrator/ngx-until-destroyed.svg)](https://www.npmjs.com/package/@orchestrator/ngx-until-destroyed)
[![Npm Downloads](https://img.shields.io/npm/dt/@orchestrator/ngx-until-destroyed.svg)](https://www.npmjs.com/package/@orchestrator/ngx-until-destroyed)
![Licence](https://img.shields.io/github/license/orchestratora/ngx-until-destroyed.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

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
