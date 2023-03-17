import {
  Annotation,
  CreateObservableOptions,
  IComputedValue,
} from 'mobx/dist/internal';

export type Initializer =
  | { type: 'observables'; payload: {} }
  | { type: 'computeds'; payload: (self: any) => {} }
  | { type: 'actions'; payload: (self: any) => {} }
  | { type: 'annotations'; payload: {} }
  | { type: 'options'; payload: {} };

export type BuilderComputeds<
  ComputedsMaker extends (...args: any) => Record<string, (...args: any) => any>
> = {
  [Key in keyof ReturnType<ComputedsMaker>]: ReturnType<
    ReturnType<ComputedsMaker>[Key]
  >;
};

export type BuilderAnnotations<
  Observables extends {},
  Computeds extends {},
  Actions extends {}
> = Partial<
  Record<
    (keyof Observables | keyof Computeds | keyof Actions) & string,
    Annotation | false
  >
>;

export type BuilderOverridenParams<Params, AddParams> = {
  [Key in keyof Omit<Params, keyof AddParams>]: Params[Key];
} & AddParams;

export type ObservableSetter<Value> = (
  value: Value | ((prev: Value) => Value)
) => void;

export type ActionSetter<Value extends (...args: any) => any> = (
  value: (prev: Value) => (...args: Parameters<Value>) => ReturnType<Value>
) => void;

export type PositionedActionSetter<Value extends (...args: any) => any> = (
  value: (...args: Parameters<Value>) => ReturnType<Value>
) => void;

export type BuilderSetters<
  Observables extends {} = {},
  Actions extends { [x: string]: (...args: any) => any } = {}
> = {
  [Key in keyof Observables as Observables[Key] extends (...args: any) => any
    ? never
    : `set${Capitalize<Key & string>}`]: ObservableSetter<Observables[Key]>;
} & {
  [Key in keyof Actions as `set${Capitalize<Key & string>}`]: ActionSetter<
    Actions[Key]
  >;
} & {
  [Key in keyof Actions as `setBefore${Capitalize<
    Key & string
  >}`]: PositionedActionSetter<Actions[Key]>;
} & {
  [Key in keyof Actions as `setAfter${Capitalize<
    Key & string
  >}`]: PositionedActionSetter<Actions[Key]>;
};

export type BuilderExtender<Value> = (
  extension: (prev: IComputedValue<Value>) => Value
) => void;

export type BuilderExtenders<Values extends {}> = {
  [Key in keyof Values as `extend${Capitalize<Key & string>}`]: BuilderExtender<
    Values[Key]
  >;
};

export type Store<T extends IBuilder<any, any, any, any, any, any>> =
  T extends IBuilder<
    infer Observables,
    infer Computeds,
    infer Actions,
    infer U,
    infer L,
    infer J
  >
    ? Observables &
        Computeds &
        Actions &
        BuilderExtenders<Observables & Computeds> &
        BuilderSetters<Observables, Actions>
    : never;

export type InnerStore<T extends IBuilder<any, any, any, any, any, any>> =
  T extends IBuilder<
    infer PublicObservables,
    infer PublicComputeds,
    infer PublicActions,
    infer PrivateObservables,
    infer PrivateComputeds,
    infer PrivateActions
  >
    ? PublicObservables &
        PublicComputeds &
        PublicActions &
        PrivateObservables &
        PrivateComputeds &
        PrivateActions &
        BuilderExtenders<
          PublicObservables &
            PrivateObservables &
            PublicComputeds &
            PrivateComputeds
        > &
        BuilderSetters<
          PublicObservables & PrivateObservables,
          PublicActions & PrivateActions
        >
    : never;

export interface IBuilder<
  PublicObservables extends {} = {},
  PublicComputeds extends {} = {},
  PublicActions extends {} = {},
  PrivateObservables extends {} = {},
  PrivateComputeds extends {} = {},
  PrivateActions extends {} = {}
> {
  name(
    value: string
  ): IBuilder<
    PublicObservables,
    PublicComputeds,
    PublicActions,
    PrivateObservables,
    PrivateComputeds,
    PrivateActions
  >;
  observables<AddObservables extends Record<string, unknown>>(
    defaultValues: AddObservables
  ): IBuilder<
    BuilderOverridenParams<PublicObservables, AddObservables>,
    Omit<PublicComputeds, keyof AddObservables>,
    PublicActions,
    PrivateObservables,
    PrivateComputeds,
    PrivateActions
  >;
  privateObservables<AddObservables extends Record<string, unknown>>(
    defaultValues: AddObservables
  ): IBuilder<
    PublicObservables,
    PublicComputeds,
    PublicActions,
    BuilderOverridenParams<PrivateObservables, AddObservables>,
    Omit<PrivateComputeds, keyof AddObservables>,
    PrivateActions
  >;
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
  ): IBuilder<
    Omit<PublicObservables, keyof AddComputeds>,
    BuilderOverridenParams<PublicComputeds, AddComputeds>,
    PublicActions,
    PrivateObservables,
    PrivateComputeds,
    PrivateActions
  >;
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
  ): IBuilder<
    PublicObservables,
    PublicComputeds,
    PublicActions,
    Omit<PrivateObservables, keyof AddComputeds>,
    BuilderOverridenParams<PrivateComputeds, AddComputeds>,
    PrivateActions
  >;
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
  ): IBuilder<
    PublicObservables,
    PublicComputeds,
    BuilderOverridenParams<PublicActions, AddActions>,
    PrivateObservables,
    PrivateComputeds,
    PrivateActions
  >;
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
  >;
  annotations(
    annotations: BuilderAnnotations<
      PublicObservables,
      PublicComputeds,
      PublicActions
    >
  ): IBuilder<
    PublicObservables,
    PublicComputeds,
    PublicActions,
    PrivateObservables,
    PrivateComputeds,
    PrivateActions
  >;
  options(
    options: CreateObservableOptions
  ): IBuilder<
    PublicObservables,
    PublicComputeds,
    PublicActions,
    PrivateObservables,
    PrivateComputeds,
    PrivateActions
  >;
  create(
    initialValues?: PublicObservables
  ): Store<
    IBuilder<
      PublicObservables,
      PublicComputeds,
      PublicActions,
      PrivateObservables,
      PrivateComputeds,
      PrivateActions
    >
  >;
}

export type PropertiesMarkup = Record<string, Initializer['type']>;
