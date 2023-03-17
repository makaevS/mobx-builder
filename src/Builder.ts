import { makeAutoObservable } from 'mobx';
import { CreateObservableOptions } from 'mobx/dist/internal';
// import applyInitialValues from './applyInitialValues';
// import applyProperties from './applyProperties';
// import bindPropertiest from './bindProperties';
import prepareActions from './prepareActions';
import prepareComputeds from './prepareComputeds';
import prepareObservables from './prepareObservables';
import type {
  BuilderAnnotations,
  BuilderComputeds,
  BuilderExtenders,
  BuilderOverridenParams,
  BuilderSetters,
  IBuilder,
  Initializer,
  InnerStore,
  PropertiesMarkup,
  Store,
} from './types';

export default class Builder<
  PublicObservables extends {} = {},
  PublicComputeds extends {} = {},
  PublicActions extends {} = {},
  PrivateObservables extends {} = {},
  PrivateComputeds extends {} = {},
  PrivateActions extends {} = {}
> {
  constructor(protected _initializers: Initializer[] = []) {}

  name(
    value: string
  ): Builder<
    PublicObservables,
    PublicComputeds,
    PublicActions,
    PrivateObservables,
    PrivateComputeds,
    PrivateActions
  > {
    const nextInitializers = this._initializers.concat({
      type: 'options',
      payload: { name: value },
    });
    return new Builder(nextInitializers) as never;
  }

  observables<AddObservables extends Record<string, unknown>>(
    defaultValues: AddObservables
  ): Builder<
    BuilderOverridenParams<PublicObservables, AddObservables>,
    Omit<PublicComputeds, keyof AddObservables>,
    PublicActions,
    PrivateObservables,
    PrivateComputeds,
    PrivateActions
  > {
    const nextInitializers = this._initializers.concat({
      type: 'observables',
      payload: defaultValues,
    });
    return new Builder(nextInitializers) as never;
  }

  privateObservables<AddObservables extends Record<string, unknown>>(
    defaultValues: AddObservables
  ): Builder<
    PublicObservables,
    PublicComputeds,
    PublicActions,
    BuilderOverridenParams<PrivateObservables, AddObservables>,
    Omit<PrivateComputeds, keyof AddObservables>,
    PrivateActions
  > {
    const nextInitializers = this._initializers.concat({
      type: 'observables',
      payload: defaultValues,
    });
    return new Builder(nextInitializers) as never;
  }

  computeds<
    ComputedsMaker extends (
      self: InnerStore<
        IBuilder<
          PublicObservables,
          PublicComputeds,
          PublicActions,
          PrivateObservables,
          PrivateComputeds,
          PrivateActions
        >
      >
    ) => Record<string, (...args: any) => any>,
    AddComputeds extends BuilderComputeds<ComputedsMaker>
  >(
    computedsMaker: ComputedsMaker
  ): Builder<
    Omit<PublicObservables, keyof AddComputeds>,
    BuilderOverridenParams<PublicComputeds, AddComputeds>,
    PublicActions,
    PrivateObservables,
    PrivateComputeds,
    PrivateActions
  > {
    const nextInitializers = this._initializers.concat({
      type: 'computeds',
      payload: computedsMaker,
    });
    return new Builder(nextInitializers) as never;
  }

  privateComputeds<
    ComputedsMaker extends (
      self: InnerStore<
        IBuilder<
          PublicObservables,
          PublicComputeds,
          PublicActions,
          PrivateObservables,
          PrivateComputeds,
          PrivateActions
        >
      >
    ) => Record<string, (...args: any) => any>,
    AddComputeds extends BuilderComputeds<ComputedsMaker>
  >(
    computedsMaker: ComputedsMaker
  ): Builder<
    PublicObservables,
    PublicComputeds,
    PublicActions,
    Omit<PrivateObservables, keyof AddComputeds>,
    BuilderOverridenParams<PrivateComputeds, AddComputeds>,
    PrivateActions
  > {
    const nextInitializers = this._initializers.concat({
      type: 'computeds',
      payload: computedsMaker,
    });
    return new Builder(nextInitializers) as never;
  }

  actions<
    ActionsMaker extends (
      self: InnerStore<
        IBuilder<
          PublicObservables,
          PublicComputeds,
          PublicActions,
          PrivateObservables,
          PrivateComputeds,
          PrivateActions
        >
      >
    ) => Record<string, (...args: any) => any>,
    AddActions extends ReturnType<ActionsMaker>
  >(
    actionsMaker: ActionsMaker
  ): Builder<
    PublicObservables,
    PublicComputeds,
    BuilderOverridenParams<PublicActions, AddActions>,
    PrivateObservables,
    PrivateComputeds,
    PrivateActions
  > {
    const nextInitializers = this._initializers.concat({
      type: 'actions',
      payload: actionsMaker,
    });
    return new Builder(nextInitializers) as never;
  }

  privateActions<
    ActionsMaker extends (
      self: InnerStore<
        IBuilder<
          PublicObservables,
          PublicComputeds,
          PublicActions,
          PrivateObservables,
          PrivateComputeds,
          PrivateActions
        >
      >
    ) => Record<string, (...args: any) => any>,
    AddActions extends ReturnType<ActionsMaker>
  >(
    actionsMaker: ActionsMaker
  ): IBuilder<
    PublicObservables,
    PublicActions,
    PrivateObservables,
    PrivateComputeds,
    BuilderOverridenParams<PrivateActions, AddActions>
  > {
    const nextInitializers = this._initializers.concat({
      type: 'actions',
      payload: actionsMaker,
    });
    return new Builder(nextInitializers) as never;
  }

  annotations(
    annotations: BuilderAnnotations<
      PublicObservables,
      PublicComputeds,
      PublicActions
    >
  ): Builder<
    PublicObservables,
    PublicComputeds,
    PublicActions,
    PrivateObservables,
    PrivateComputeds,
    PrivateActions
  > {
    const nextInitializers = this._initializers.concat({
      type: 'annotations',
      payload: annotations,
    });
    return new Builder(nextInitializers) as never;
  }

  options(
    options: CreateObservableOptions
  ): Builder<
    PublicObservables,
    PublicComputeds,
    PublicActions,
    PrivateObservables,
    PrivateComputeds,
    PrivateActions
  > {
    const nextInitializers = this._initializers.concat({
      type: 'options',
      payload: options,
    });
    return new Builder(nextInitializers) as never;
  }

  create(
    initialValues: Partial<PublicObservables>
  ): Store<
    IBuilder<
      PublicObservables,
      PublicComputeds,
      PublicActions,
      PrivateObservables,
      PrivateComputeds,
      PrivateActions
    >
  > {
    const store = {};
    const initial = {};
    const markup = {} as PropertiesMarkup;
    const annotations = {};
    const options = {};
    this._initializers.forEach(({ type, payload }) => {
      switch (type) {
        case 'observables': {
          prepareObservables(payload, initial, markup);
          break;
        }
        case 'computeds': {
          prepareComputeds(payload, initial, markup, store);
          break;
        }
        case 'actions': {
          prepareActions(payload, initial, markup, store);
          break;
        }
        case 'annotations': {
          Object.keys(payload).forEach(key => {
            annotations[key as never] = payload[key as never];
          });
          break;
        }
        case 'options': {
          Object.keys(payload).forEach(key => {
            options[key as never] = payload[key as never];
          });
          break;
        }
        default:
          throw new Error(`Unknown initializer type: ${type}`);
      }
    });
    // applyProperties(store, initial, markup, annotations);
    // makeAutoObservable(store, annotations, options);
    // bindPropertiest(store, markup);
    // applyInitialValues(store, initialValues);
    return store as never;
  }
}
