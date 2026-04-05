
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model PokerPlayer
 * 
 */
export type PokerPlayer = $Result.DefaultSelection<Prisma.$PokerPlayerPayload>
/**
 * Model PokerState
 * 
 */
export type PokerState = $Result.DefaultSelection<Prisma.$PokerStatePayload>
/**
 * Model PumpkinPlayer
 * 
 */
export type PumpkinPlayer = $Result.DefaultSelection<Prisma.$PumpkinPlayerPayload>
/**
 * Model PumpkinStats
 * 
 */
export type PumpkinStats = $Result.DefaultSelection<Prisma.$PumpkinStatsPayload>
/**
 * Model PumpkinStrings
 * 
 */
export type PumpkinStrings = $Result.DefaultSelection<Prisma.$PumpkinStringsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const POKER_ROUND: {
  PREFLOP: 'PREFLOP',
  FLOP: 'FLOP',
  TURN: 'TURN',
  RIVER: 'RIVER'
};

export type POKER_ROUND = (typeof POKER_ROUND)[keyof typeof POKER_ROUND]

}

export type POKER_ROUND = $Enums.POKER_ROUND

export const POKER_ROUND: typeof $Enums.POKER_ROUND

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pokerPlayer`: Exposes CRUD operations for the **PokerPlayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PokerPlayers
    * const pokerPlayers = await prisma.pokerPlayer.findMany()
    * ```
    */
  get pokerPlayer(): Prisma.PokerPlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pokerState`: Exposes CRUD operations for the **PokerState** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PokerStates
    * const pokerStates = await prisma.pokerState.findMany()
    * ```
    */
  get pokerState(): Prisma.PokerStateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pumpkinPlayer`: Exposes CRUD operations for the **PumpkinPlayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PumpkinPlayers
    * const pumpkinPlayers = await prisma.pumpkinPlayer.findMany()
    * ```
    */
  get pumpkinPlayer(): Prisma.PumpkinPlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pumpkinStats`: Exposes CRUD operations for the **PumpkinStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PumpkinStats
    * const pumpkinStats = await prisma.pumpkinStats.findMany()
    * ```
    */
  get pumpkinStats(): Prisma.PumpkinStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pumpkinStrings`: Exposes CRUD operations for the **PumpkinStrings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PumpkinStrings
    * const pumpkinStrings = await prisma.pumpkinStrings.findMany()
    * ```
    */
  get pumpkinStrings(): Prisma.PumpkinStringsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    PokerPlayer: 'PokerPlayer',
    PokerState: 'PokerState',
    PumpkinPlayer: 'PumpkinPlayer',
    PumpkinStats: 'PumpkinStats',
    PumpkinStrings: 'PumpkinStrings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "pokerPlayer" | "pokerState" | "pumpkinPlayer" | "pumpkinStats" | "pumpkinStrings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      PokerPlayer: {
        payload: Prisma.$PokerPlayerPayload<ExtArgs>
        fields: Prisma.PokerPlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PokerPlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerPlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PokerPlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerPlayerPayload>
          }
          findFirst: {
            args: Prisma.PokerPlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerPlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PokerPlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerPlayerPayload>
          }
          findMany: {
            args: Prisma.PokerPlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerPlayerPayload>[]
          }
          create: {
            args: Prisma.PokerPlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerPlayerPayload>
          }
          createMany: {
            args: Prisma.PokerPlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PokerPlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerPlayerPayload>[]
          }
          delete: {
            args: Prisma.PokerPlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerPlayerPayload>
          }
          update: {
            args: Prisma.PokerPlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerPlayerPayload>
          }
          deleteMany: {
            args: Prisma.PokerPlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PokerPlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PokerPlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerPlayerPayload>[]
          }
          upsert: {
            args: Prisma.PokerPlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerPlayerPayload>
          }
          aggregate: {
            args: Prisma.PokerPlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePokerPlayer>
          }
          groupBy: {
            args: Prisma.PokerPlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PokerPlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PokerPlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PokerPlayerCountAggregateOutputType> | number
          }
        }
      }
      PokerState: {
        payload: Prisma.$PokerStatePayload<ExtArgs>
        fields: Prisma.PokerStateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PokerStateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerStatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PokerStateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerStatePayload>
          }
          findFirst: {
            args: Prisma.PokerStateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerStatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PokerStateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerStatePayload>
          }
          findMany: {
            args: Prisma.PokerStateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerStatePayload>[]
          }
          create: {
            args: Prisma.PokerStateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerStatePayload>
          }
          createMany: {
            args: Prisma.PokerStateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PokerStateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerStatePayload>[]
          }
          delete: {
            args: Prisma.PokerStateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerStatePayload>
          }
          update: {
            args: Prisma.PokerStateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerStatePayload>
          }
          deleteMany: {
            args: Prisma.PokerStateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PokerStateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PokerStateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerStatePayload>[]
          }
          upsert: {
            args: Prisma.PokerStateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PokerStatePayload>
          }
          aggregate: {
            args: Prisma.PokerStateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePokerState>
          }
          groupBy: {
            args: Prisma.PokerStateGroupByArgs<ExtArgs>
            result: $Utils.Optional<PokerStateGroupByOutputType>[]
          }
          count: {
            args: Prisma.PokerStateCountArgs<ExtArgs>
            result: $Utils.Optional<PokerStateCountAggregateOutputType> | number
          }
        }
      }
      PumpkinPlayer: {
        payload: Prisma.$PumpkinPlayerPayload<ExtArgs>
        fields: Prisma.PumpkinPlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PumpkinPlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinPlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PumpkinPlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinPlayerPayload>
          }
          findFirst: {
            args: Prisma.PumpkinPlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinPlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PumpkinPlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinPlayerPayload>
          }
          findMany: {
            args: Prisma.PumpkinPlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinPlayerPayload>[]
          }
          create: {
            args: Prisma.PumpkinPlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinPlayerPayload>
          }
          createMany: {
            args: Prisma.PumpkinPlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PumpkinPlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinPlayerPayload>[]
          }
          delete: {
            args: Prisma.PumpkinPlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinPlayerPayload>
          }
          update: {
            args: Prisma.PumpkinPlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinPlayerPayload>
          }
          deleteMany: {
            args: Prisma.PumpkinPlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PumpkinPlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PumpkinPlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinPlayerPayload>[]
          }
          upsert: {
            args: Prisma.PumpkinPlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinPlayerPayload>
          }
          aggregate: {
            args: Prisma.PumpkinPlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePumpkinPlayer>
          }
          groupBy: {
            args: Prisma.PumpkinPlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PumpkinPlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PumpkinPlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PumpkinPlayerCountAggregateOutputType> | number
          }
        }
      }
      PumpkinStats: {
        payload: Prisma.$PumpkinStatsPayload<ExtArgs>
        fields: Prisma.PumpkinStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PumpkinStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PumpkinStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStatsPayload>
          }
          findFirst: {
            args: Prisma.PumpkinStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PumpkinStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStatsPayload>
          }
          findMany: {
            args: Prisma.PumpkinStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStatsPayload>[]
          }
          create: {
            args: Prisma.PumpkinStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStatsPayload>
          }
          createMany: {
            args: Prisma.PumpkinStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PumpkinStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStatsPayload>[]
          }
          delete: {
            args: Prisma.PumpkinStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStatsPayload>
          }
          update: {
            args: Prisma.PumpkinStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStatsPayload>
          }
          deleteMany: {
            args: Prisma.PumpkinStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PumpkinStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PumpkinStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStatsPayload>[]
          }
          upsert: {
            args: Prisma.PumpkinStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStatsPayload>
          }
          aggregate: {
            args: Prisma.PumpkinStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePumpkinStats>
          }
          groupBy: {
            args: Prisma.PumpkinStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PumpkinStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PumpkinStatsCountArgs<ExtArgs>
            result: $Utils.Optional<PumpkinStatsCountAggregateOutputType> | number
          }
        }
      }
      PumpkinStrings: {
        payload: Prisma.$PumpkinStringsPayload<ExtArgs>
        fields: Prisma.PumpkinStringsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PumpkinStringsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStringsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PumpkinStringsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStringsPayload>
          }
          findFirst: {
            args: Prisma.PumpkinStringsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStringsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PumpkinStringsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStringsPayload>
          }
          findMany: {
            args: Prisma.PumpkinStringsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStringsPayload>[]
          }
          create: {
            args: Prisma.PumpkinStringsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStringsPayload>
          }
          createMany: {
            args: Prisma.PumpkinStringsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PumpkinStringsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStringsPayload>[]
          }
          delete: {
            args: Prisma.PumpkinStringsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStringsPayload>
          }
          update: {
            args: Prisma.PumpkinStringsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStringsPayload>
          }
          deleteMany: {
            args: Prisma.PumpkinStringsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PumpkinStringsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PumpkinStringsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStringsPayload>[]
          }
          upsert: {
            args: Prisma.PumpkinStringsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PumpkinStringsPayload>
          }
          aggregate: {
            args: Prisma.PumpkinStringsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePumpkinStrings>
          }
          groupBy: {
            args: Prisma.PumpkinStringsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PumpkinStringsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PumpkinStringsCountArgs<ExtArgs>
            result: $Utils.Optional<PumpkinStringsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    pokerPlayer?: PokerPlayerOmit
    pokerState?: PokerStateOmit
    pumpkinPlayer?: PumpkinPlayerOmit
    pumpkinStats?: PumpkinStatsOmit
    pumpkinStrings?: PumpkinStringsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    pumpkinPlayer: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pumpkinPlayer?: boolean | UserCountOutputTypeCountPumpkinPlayerArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPumpkinPlayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PumpkinPlayerWhereInput
  }


  /**
   * Count Type PokerStateCountOutputType
   */

  export type PokerStateCountOutputType = {
    players: number
  }

  export type PokerStateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | PokerStateCountOutputTypeCountPlayersArgs
  }

  // Custom InputTypes
  /**
   * PokerStateCountOutputType without action
   */
  export type PokerStateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerStateCountOutputType
     */
    select?: PokerStateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PokerStateCountOutputType without action
   */
  export type PokerStateCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PokerPlayerWhereInput
  }


  /**
   * Count Type PumpkinPlayerCountOutputType
   */

  export type PumpkinPlayerCountOutputType = {
    stats: number
  }

  export type PumpkinPlayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stats?: boolean | PumpkinPlayerCountOutputTypeCountStatsArgs
  }

  // Custom InputTypes
  /**
   * PumpkinPlayerCountOutputType without action
   */
  export type PumpkinPlayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayerCountOutputType
     */
    select?: PumpkinPlayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PumpkinPlayerCountOutputType without action
   */
  export type PumpkinPlayerCountOutputTypeCountStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PumpkinStatsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tgUserId: string | null
    firstName: string | null
    lastName: string | null
    username: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tgUserId: string | null
    firstName: string | null
    lastName: string | null
    username: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    tgUserId: number
    firstName: number
    lastName: number
    username: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    tgUserId?: true
    firstName?: true
    lastName?: true
    username?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    tgUserId?: true
    firstName?: true
    lastName?: true
    username?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    tgUserId?: true
    firstName?: true
    lastName?: true
    username?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    tgUserId: string
    firstName: string
    lastName: string | null
    username: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tgUserId?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    pokerPlayer?: boolean | User$pokerPlayerArgs<ExtArgs>
    pumpkinPlayer?: boolean | User$pumpkinPlayerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tgUserId?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tgUserId?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tgUserId?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "tgUserId" | "firstName" | "lastName" | "username", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pokerPlayer?: boolean | User$pokerPlayerArgs<ExtArgs>
    pumpkinPlayer?: boolean | User$pumpkinPlayerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      pokerPlayer: Prisma.$PokerPlayerPayload<ExtArgs> | null
      pumpkinPlayer: Prisma.$PumpkinPlayerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      tgUserId: string
      firstName: string
      lastName: string | null
      username: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pokerPlayer<T extends User$pokerPlayerArgs<ExtArgs> = {}>(args?: Subset<T, User$pokerPlayerArgs<ExtArgs>>): Prisma__PokerPlayerClient<$Result.GetResult<Prisma.$PokerPlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    pumpkinPlayer<T extends User$pumpkinPlayerArgs<ExtArgs> = {}>(args?: Subset<T, User$pumpkinPlayerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PumpkinPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly tgUserId: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.pokerPlayer
   */
  export type User$pokerPlayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerInclude<ExtArgs> | null
    where?: PokerPlayerWhereInput
  }

  /**
   * User.pumpkinPlayer
   */
  export type User$pumpkinPlayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayer
     */
    select?: PumpkinPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinPlayer
     */
    omit?: PumpkinPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinPlayerInclude<ExtArgs> | null
    where?: PumpkinPlayerWhereInput
    orderBy?: PumpkinPlayerOrderByWithRelationInput | PumpkinPlayerOrderByWithRelationInput[]
    cursor?: PumpkinPlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PumpkinPlayerScalarFieldEnum | PumpkinPlayerScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model PokerPlayer
   */

  export type AggregatePokerPlayer = {
    _count: PokerPlayerCountAggregateOutputType | null
    _avg: PokerPlayerAvgAggregateOutputType | null
    _sum: PokerPlayerSumAggregateOutputType | null
    _min: PokerPlayerMinAggregateOutputType | null
    _max: PokerPlayerMaxAggregateOutputType | null
  }

  export type PokerPlayerAvgAggregateOutputType = {
    cards: number | null
    balance: number | null
    betAmount: number | null
  }

  export type PokerPlayerSumAggregateOutputType = {
    cards: number[]
    balance: number | null
    betAmount: number | null
  }

  export type PokerPlayerMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    balance: number | null
    betAmount: number | null
    hasFolded: boolean | null
    hasLost: boolean | null
    hasTurned: boolean | null
    userId: string | null
    stateId: string | null
  }

  export type PokerPlayerMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    balance: number | null
    betAmount: number | null
    hasFolded: boolean | null
    hasLost: boolean | null
    hasTurned: boolean | null
    userId: string | null
    stateId: string | null
  }

  export type PokerPlayerCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    cards: number
    balance: number
    betAmount: number
    hasFolded: number
    hasLost: number
    hasTurned: number
    userId: number
    stateId: number
    _all: number
  }


  export type PokerPlayerAvgAggregateInputType = {
    cards?: true
    balance?: true
    betAmount?: true
  }

  export type PokerPlayerSumAggregateInputType = {
    cards?: true
    balance?: true
    betAmount?: true
  }

  export type PokerPlayerMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    balance?: true
    betAmount?: true
    hasFolded?: true
    hasLost?: true
    hasTurned?: true
    userId?: true
    stateId?: true
  }

  export type PokerPlayerMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    balance?: true
    betAmount?: true
    hasFolded?: true
    hasLost?: true
    hasTurned?: true
    userId?: true
    stateId?: true
  }

  export type PokerPlayerCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    cards?: true
    balance?: true
    betAmount?: true
    hasFolded?: true
    hasLost?: true
    hasTurned?: true
    userId?: true
    stateId?: true
    _all?: true
  }

  export type PokerPlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PokerPlayer to aggregate.
     */
    where?: PokerPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokerPlayers to fetch.
     */
    orderBy?: PokerPlayerOrderByWithRelationInput | PokerPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PokerPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokerPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokerPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PokerPlayers
    **/
    _count?: true | PokerPlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PokerPlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PokerPlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PokerPlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PokerPlayerMaxAggregateInputType
  }

  export type GetPokerPlayerAggregateType<T extends PokerPlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePokerPlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePokerPlayer[P]>
      : GetScalarType<T[P], AggregatePokerPlayer[P]>
  }




  export type PokerPlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PokerPlayerWhereInput
    orderBy?: PokerPlayerOrderByWithAggregationInput | PokerPlayerOrderByWithAggregationInput[]
    by: PokerPlayerScalarFieldEnum[] | PokerPlayerScalarFieldEnum
    having?: PokerPlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PokerPlayerCountAggregateInputType | true
    _avg?: PokerPlayerAvgAggregateInputType
    _sum?: PokerPlayerSumAggregateInputType
    _min?: PokerPlayerMinAggregateInputType
    _max?: PokerPlayerMaxAggregateInputType
  }

  export type PokerPlayerGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    cards: number[]
    balance: number
    betAmount: number
    hasFolded: boolean
    hasLost: boolean
    hasTurned: boolean
    userId: string
    stateId: string
    _count: PokerPlayerCountAggregateOutputType | null
    _avg: PokerPlayerAvgAggregateOutputType | null
    _sum: PokerPlayerSumAggregateOutputType | null
    _min: PokerPlayerMinAggregateOutputType | null
    _max: PokerPlayerMaxAggregateOutputType | null
  }

  type GetPokerPlayerGroupByPayload<T extends PokerPlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PokerPlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PokerPlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PokerPlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PokerPlayerGroupByOutputType[P]>
        }
      >
    >


  export type PokerPlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cards?: boolean
    balance?: boolean
    betAmount?: boolean
    hasFolded?: boolean
    hasLost?: boolean
    hasTurned?: boolean
    userId?: boolean
    stateId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    state?: boolean | PokerStateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pokerPlayer"]>

  export type PokerPlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cards?: boolean
    balance?: boolean
    betAmount?: boolean
    hasFolded?: boolean
    hasLost?: boolean
    hasTurned?: boolean
    userId?: boolean
    stateId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    state?: boolean | PokerStateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pokerPlayer"]>

  export type PokerPlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cards?: boolean
    balance?: boolean
    betAmount?: boolean
    hasFolded?: boolean
    hasLost?: boolean
    hasTurned?: boolean
    userId?: boolean
    stateId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    state?: boolean | PokerStateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pokerPlayer"]>

  export type PokerPlayerSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cards?: boolean
    balance?: boolean
    betAmount?: boolean
    hasFolded?: boolean
    hasLost?: boolean
    hasTurned?: boolean
    userId?: boolean
    stateId?: boolean
  }

  export type PokerPlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "cards" | "balance" | "betAmount" | "hasFolded" | "hasLost" | "hasTurned" | "userId" | "stateId", ExtArgs["result"]["pokerPlayer"]>
  export type PokerPlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    state?: boolean | PokerStateDefaultArgs<ExtArgs>
  }
  export type PokerPlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    state?: boolean | PokerStateDefaultArgs<ExtArgs>
  }
  export type PokerPlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    state?: boolean | PokerStateDefaultArgs<ExtArgs>
  }

  export type $PokerPlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PokerPlayer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      state: Prisma.$PokerStatePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      cards: number[]
      balance: number
      betAmount: number
      hasFolded: boolean
      hasLost: boolean
      hasTurned: boolean
      userId: string
      stateId: string
    }, ExtArgs["result"]["pokerPlayer"]>
    composites: {}
  }

  type PokerPlayerGetPayload<S extends boolean | null | undefined | PokerPlayerDefaultArgs> = $Result.GetResult<Prisma.$PokerPlayerPayload, S>

  type PokerPlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PokerPlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PokerPlayerCountAggregateInputType | true
    }

  export interface PokerPlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PokerPlayer'], meta: { name: 'PokerPlayer' } }
    /**
     * Find zero or one PokerPlayer that matches the filter.
     * @param {PokerPlayerFindUniqueArgs} args - Arguments to find a PokerPlayer
     * @example
     * // Get one PokerPlayer
     * const pokerPlayer = await prisma.pokerPlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PokerPlayerFindUniqueArgs>(args: SelectSubset<T, PokerPlayerFindUniqueArgs<ExtArgs>>): Prisma__PokerPlayerClient<$Result.GetResult<Prisma.$PokerPlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PokerPlayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PokerPlayerFindUniqueOrThrowArgs} args - Arguments to find a PokerPlayer
     * @example
     * // Get one PokerPlayer
     * const pokerPlayer = await prisma.pokerPlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PokerPlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PokerPlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PokerPlayerClient<$Result.GetResult<Prisma.$PokerPlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PokerPlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerPlayerFindFirstArgs} args - Arguments to find a PokerPlayer
     * @example
     * // Get one PokerPlayer
     * const pokerPlayer = await prisma.pokerPlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PokerPlayerFindFirstArgs>(args?: SelectSubset<T, PokerPlayerFindFirstArgs<ExtArgs>>): Prisma__PokerPlayerClient<$Result.GetResult<Prisma.$PokerPlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PokerPlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerPlayerFindFirstOrThrowArgs} args - Arguments to find a PokerPlayer
     * @example
     * // Get one PokerPlayer
     * const pokerPlayer = await prisma.pokerPlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PokerPlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PokerPlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PokerPlayerClient<$Result.GetResult<Prisma.$PokerPlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PokerPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerPlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PokerPlayers
     * const pokerPlayers = await prisma.pokerPlayer.findMany()
     * 
     * // Get first 10 PokerPlayers
     * const pokerPlayers = await prisma.pokerPlayer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pokerPlayerWithIdOnly = await prisma.pokerPlayer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PokerPlayerFindManyArgs>(args?: SelectSubset<T, PokerPlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokerPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PokerPlayer.
     * @param {PokerPlayerCreateArgs} args - Arguments to create a PokerPlayer.
     * @example
     * // Create one PokerPlayer
     * const PokerPlayer = await prisma.pokerPlayer.create({
     *   data: {
     *     // ... data to create a PokerPlayer
     *   }
     * })
     * 
     */
    create<T extends PokerPlayerCreateArgs>(args: SelectSubset<T, PokerPlayerCreateArgs<ExtArgs>>): Prisma__PokerPlayerClient<$Result.GetResult<Prisma.$PokerPlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PokerPlayers.
     * @param {PokerPlayerCreateManyArgs} args - Arguments to create many PokerPlayers.
     * @example
     * // Create many PokerPlayers
     * const pokerPlayer = await prisma.pokerPlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PokerPlayerCreateManyArgs>(args?: SelectSubset<T, PokerPlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PokerPlayers and returns the data saved in the database.
     * @param {PokerPlayerCreateManyAndReturnArgs} args - Arguments to create many PokerPlayers.
     * @example
     * // Create many PokerPlayers
     * const pokerPlayer = await prisma.pokerPlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PokerPlayers and only return the `id`
     * const pokerPlayerWithIdOnly = await prisma.pokerPlayer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PokerPlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PokerPlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokerPlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PokerPlayer.
     * @param {PokerPlayerDeleteArgs} args - Arguments to delete one PokerPlayer.
     * @example
     * // Delete one PokerPlayer
     * const PokerPlayer = await prisma.pokerPlayer.delete({
     *   where: {
     *     // ... filter to delete one PokerPlayer
     *   }
     * })
     * 
     */
    delete<T extends PokerPlayerDeleteArgs>(args: SelectSubset<T, PokerPlayerDeleteArgs<ExtArgs>>): Prisma__PokerPlayerClient<$Result.GetResult<Prisma.$PokerPlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PokerPlayer.
     * @param {PokerPlayerUpdateArgs} args - Arguments to update one PokerPlayer.
     * @example
     * // Update one PokerPlayer
     * const pokerPlayer = await prisma.pokerPlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PokerPlayerUpdateArgs>(args: SelectSubset<T, PokerPlayerUpdateArgs<ExtArgs>>): Prisma__PokerPlayerClient<$Result.GetResult<Prisma.$PokerPlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PokerPlayers.
     * @param {PokerPlayerDeleteManyArgs} args - Arguments to filter PokerPlayers to delete.
     * @example
     * // Delete a few PokerPlayers
     * const { count } = await prisma.pokerPlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PokerPlayerDeleteManyArgs>(args?: SelectSubset<T, PokerPlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PokerPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerPlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PokerPlayers
     * const pokerPlayer = await prisma.pokerPlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PokerPlayerUpdateManyArgs>(args: SelectSubset<T, PokerPlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PokerPlayers and returns the data updated in the database.
     * @param {PokerPlayerUpdateManyAndReturnArgs} args - Arguments to update many PokerPlayers.
     * @example
     * // Update many PokerPlayers
     * const pokerPlayer = await prisma.pokerPlayer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PokerPlayers and only return the `id`
     * const pokerPlayerWithIdOnly = await prisma.pokerPlayer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PokerPlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, PokerPlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokerPlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PokerPlayer.
     * @param {PokerPlayerUpsertArgs} args - Arguments to update or create a PokerPlayer.
     * @example
     * // Update or create a PokerPlayer
     * const pokerPlayer = await prisma.pokerPlayer.upsert({
     *   create: {
     *     // ... data to create a PokerPlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PokerPlayer we want to update
     *   }
     * })
     */
    upsert<T extends PokerPlayerUpsertArgs>(args: SelectSubset<T, PokerPlayerUpsertArgs<ExtArgs>>): Prisma__PokerPlayerClient<$Result.GetResult<Prisma.$PokerPlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PokerPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerPlayerCountArgs} args - Arguments to filter PokerPlayers to count.
     * @example
     * // Count the number of PokerPlayers
     * const count = await prisma.pokerPlayer.count({
     *   where: {
     *     // ... the filter for the PokerPlayers we want to count
     *   }
     * })
    **/
    count<T extends PokerPlayerCountArgs>(
      args?: Subset<T, PokerPlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PokerPlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PokerPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerPlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PokerPlayerAggregateArgs>(args: Subset<T, PokerPlayerAggregateArgs>): Prisma.PrismaPromise<GetPokerPlayerAggregateType<T>>

    /**
     * Group by PokerPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerPlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PokerPlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PokerPlayerGroupByArgs['orderBy'] }
        : { orderBy?: PokerPlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PokerPlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPokerPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PokerPlayer model
   */
  readonly fields: PokerPlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PokerPlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PokerPlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    state<T extends PokerStateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PokerStateDefaultArgs<ExtArgs>>): Prisma__PokerStateClient<$Result.GetResult<Prisma.$PokerStatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PokerPlayer model
   */
  interface PokerPlayerFieldRefs {
    readonly id: FieldRef<"PokerPlayer", 'String'>
    readonly createdAt: FieldRef<"PokerPlayer", 'DateTime'>
    readonly updatedAt: FieldRef<"PokerPlayer", 'DateTime'>
    readonly cards: FieldRef<"PokerPlayer", 'Int[]'>
    readonly balance: FieldRef<"PokerPlayer", 'Int'>
    readonly betAmount: FieldRef<"PokerPlayer", 'Int'>
    readonly hasFolded: FieldRef<"PokerPlayer", 'Boolean'>
    readonly hasLost: FieldRef<"PokerPlayer", 'Boolean'>
    readonly hasTurned: FieldRef<"PokerPlayer", 'Boolean'>
    readonly userId: FieldRef<"PokerPlayer", 'String'>
    readonly stateId: FieldRef<"PokerPlayer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PokerPlayer findUnique
   */
  export type PokerPlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerInclude<ExtArgs> | null
    /**
     * Filter, which PokerPlayer to fetch.
     */
    where: PokerPlayerWhereUniqueInput
  }

  /**
   * PokerPlayer findUniqueOrThrow
   */
  export type PokerPlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerInclude<ExtArgs> | null
    /**
     * Filter, which PokerPlayer to fetch.
     */
    where: PokerPlayerWhereUniqueInput
  }

  /**
   * PokerPlayer findFirst
   */
  export type PokerPlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerInclude<ExtArgs> | null
    /**
     * Filter, which PokerPlayer to fetch.
     */
    where?: PokerPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokerPlayers to fetch.
     */
    orderBy?: PokerPlayerOrderByWithRelationInput | PokerPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PokerPlayers.
     */
    cursor?: PokerPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokerPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokerPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PokerPlayers.
     */
    distinct?: PokerPlayerScalarFieldEnum | PokerPlayerScalarFieldEnum[]
  }

  /**
   * PokerPlayer findFirstOrThrow
   */
  export type PokerPlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerInclude<ExtArgs> | null
    /**
     * Filter, which PokerPlayer to fetch.
     */
    where?: PokerPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokerPlayers to fetch.
     */
    orderBy?: PokerPlayerOrderByWithRelationInput | PokerPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PokerPlayers.
     */
    cursor?: PokerPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokerPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokerPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PokerPlayers.
     */
    distinct?: PokerPlayerScalarFieldEnum | PokerPlayerScalarFieldEnum[]
  }

  /**
   * PokerPlayer findMany
   */
  export type PokerPlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerInclude<ExtArgs> | null
    /**
     * Filter, which PokerPlayers to fetch.
     */
    where?: PokerPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokerPlayers to fetch.
     */
    orderBy?: PokerPlayerOrderByWithRelationInput | PokerPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PokerPlayers.
     */
    cursor?: PokerPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokerPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokerPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PokerPlayers.
     */
    distinct?: PokerPlayerScalarFieldEnum | PokerPlayerScalarFieldEnum[]
  }

  /**
   * PokerPlayer create
   */
  export type PokerPlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a PokerPlayer.
     */
    data: XOR<PokerPlayerCreateInput, PokerPlayerUncheckedCreateInput>
  }

  /**
   * PokerPlayer createMany
   */
  export type PokerPlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PokerPlayers.
     */
    data: PokerPlayerCreateManyInput | PokerPlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PokerPlayer createManyAndReturn
   */
  export type PokerPlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * The data used to create many PokerPlayers.
     */
    data: PokerPlayerCreateManyInput | PokerPlayerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PokerPlayer update
   */
  export type PokerPlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a PokerPlayer.
     */
    data: XOR<PokerPlayerUpdateInput, PokerPlayerUncheckedUpdateInput>
    /**
     * Choose, which PokerPlayer to update.
     */
    where: PokerPlayerWhereUniqueInput
  }

  /**
   * PokerPlayer updateMany
   */
  export type PokerPlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PokerPlayers.
     */
    data: XOR<PokerPlayerUpdateManyMutationInput, PokerPlayerUncheckedUpdateManyInput>
    /**
     * Filter which PokerPlayers to update
     */
    where?: PokerPlayerWhereInput
    /**
     * Limit how many PokerPlayers to update.
     */
    limit?: number
  }

  /**
   * PokerPlayer updateManyAndReturn
   */
  export type PokerPlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * The data used to update PokerPlayers.
     */
    data: XOR<PokerPlayerUpdateManyMutationInput, PokerPlayerUncheckedUpdateManyInput>
    /**
     * Filter which PokerPlayers to update
     */
    where?: PokerPlayerWhereInput
    /**
     * Limit how many PokerPlayers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PokerPlayer upsert
   */
  export type PokerPlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the PokerPlayer to update in case it exists.
     */
    where: PokerPlayerWhereUniqueInput
    /**
     * In case the PokerPlayer found by the `where` argument doesn't exist, create a new PokerPlayer with this data.
     */
    create: XOR<PokerPlayerCreateInput, PokerPlayerUncheckedCreateInput>
    /**
     * In case the PokerPlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PokerPlayerUpdateInput, PokerPlayerUncheckedUpdateInput>
  }

  /**
   * PokerPlayer delete
   */
  export type PokerPlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerInclude<ExtArgs> | null
    /**
     * Filter which PokerPlayer to delete.
     */
    where: PokerPlayerWhereUniqueInput
  }

  /**
   * PokerPlayer deleteMany
   */
  export type PokerPlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PokerPlayers to delete
     */
    where?: PokerPlayerWhereInput
    /**
     * Limit how many PokerPlayers to delete.
     */
    limit?: number
  }

  /**
   * PokerPlayer without action
   */
  export type PokerPlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerInclude<ExtArgs> | null
  }


  /**
   * Model PokerState
   */

  export type AggregatePokerState = {
    _count: PokerStateCountAggregateOutputType | null
    _avg: PokerStateAvgAggregateOutputType | null
    _sum: PokerStateSumAggregateOutputType | null
    _min: PokerStateMinAggregateOutputType | null
    _max: PokerStateMaxAggregateOutputType | null
  }

  export type PokerStateAvgAggregateOutputType = {
    cards: number | null
    dealsCount: number | null
    dealerIndex: number | null
    currentPlayerIndex: number | null
  }

  export type PokerStateSumAggregateOutputType = {
    cards: number[]
    dealsCount: number | null
    dealerIndex: number | null
    currentPlayerIndex: number | null
  }

  export type PokerStateMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tgChatId: string | null
    round: $Enums.POKER_ROUND | null
    dealsCount: number | null
    dealerIndex: number | null
    currentPlayerIndex: number | null
  }

  export type PokerStateMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tgChatId: string | null
    round: $Enums.POKER_ROUND | null
    dealsCount: number | null
    dealerIndex: number | null
    currentPlayerIndex: number | null
  }

  export type PokerStateCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    tgChatId: number
    cards: number
    round: number
    dealsCount: number
    dealerIndex: number
    currentPlayerIndex: number
    _all: number
  }


  export type PokerStateAvgAggregateInputType = {
    cards?: true
    dealsCount?: true
    dealerIndex?: true
    currentPlayerIndex?: true
  }

  export type PokerStateSumAggregateInputType = {
    cards?: true
    dealsCount?: true
    dealerIndex?: true
    currentPlayerIndex?: true
  }

  export type PokerStateMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    tgChatId?: true
    round?: true
    dealsCount?: true
    dealerIndex?: true
    currentPlayerIndex?: true
  }

  export type PokerStateMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    tgChatId?: true
    round?: true
    dealsCount?: true
    dealerIndex?: true
    currentPlayerIndex?: true
  }

  export type PokerStateCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    tgChatId?: true
    cards?: true
    round?: true
    dealsCount?: true
    dealerIndex?: true
    currentPlayerIndex?: true
    _all?: true
  }

  export type PokerStateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PokerState to aggregate.
     */
    where?: PokerStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokerStates to fetch.
     */
    orderBy?: PokerStateOrderByWithRelationInput | PokerStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PokerStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokerStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokerStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PokerStates
    **/
    _count?: true | PokerStateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PokerStateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PokerStateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PokerStateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PokerStateMaxAggregateInputType
  }

  export type GetPokerStateAggregateType<T extends PokerStateAggregateArgs> = {
        [P in keyof T & keyof AggregatePokerState]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePokerState[P]>
      : GetScalarType<T[P], AggregatePokerState[P]>
  }




  export type PokerStateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PokerStateWhereInput
    orderBy?: PokerStateOrderByWithAggregationInput | PokerStateOrderByWithAggregationInput[]
    by: PokerStateScalarFieldEnum[] | PokerStateScalarFieldEnum
    having?: PokerStateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PokerStateCountAggregateInputType | true
    _avg?: PokerStateAvgAggregateInputType
    _sum?: PokerStateSumAggregateInputType
    _min?: PokerStateMinAggregateInputType
    _max?: PokerStateMaxAggregateInputType
  }

  export type PokerStateGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    tgChatId: string
    cards: number[]
    round: $Enums.POKER_ROUND
    dealsCount: number
    dealerIndex: number
    currentPlayerIndex: number
    _count: PokerStateCountAggregateOutputType | null
    _avg: PokerStateAvgAggregateOutputType | null
    _sum: PokerStateSumAggregateOutputType | null
    _min: PokerStateMinAggregateOutputType | null
    _max: PokerStateMaxAggregateOutputType | null
  }

  type GetPokerStateGroupByPayload<T extends PokerStateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PokerStateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PokerStateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PokerStateGroupByOutputType[P]>
            : GetScalarType<T[P], PokerStateGroupByOutputType[P]>
        }
      >
    >


  export type PokerStateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tgChatId?: boolean
    cards?: boolean
    round?: boolean
    dealsCount?: boolean
    dealerIndex?: boolean
    currentPlayerIndex?: boolean
    players?: boolean | PokerState$playersArgs<ExtArgs>
    _count?: boolean | PokerStateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pokerState"]>

  export type PokerStateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tgChatId?: boolean
    cards?: boolean
    round?: boolean
    dealsCount?: boolean
    dealerIndex?: boolean
    currentPlayerIndex?: boolean
  }, ExtArgs["result"]["pokerState"]>

  export type PokerStateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tgChatId?: boolean
    cards?: boolean
    round?: boolean
    dealsCount?: boolean
    dealerIndex?: boolean
    currentPlayerIndex?: boolean
  }, ExtArgs["result"]["pokerState"]>

  export type PokerStateSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tgChatId?: boolean
    cards?: boolean
    round?: boolean
    dealsCount?: boolean
    dealerIndex?: boolean
    currentPlayerIndex?: boolean
  }

  export type PokerStateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "tgChatId" | "cards" | "round" | "dealsCount" | "dealerIndex" | "currentPlayerIndex", ExtArgs["result"]["pokerState"]>
  export type PokerStateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | PokerState$playersArgs<ExtArgs>
    _count?: boolean | PokerStateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PokerStateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PokerStateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PokerStatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PokerState"
    objects: {
      players: Prisma.$PokerPlayerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      tgChatId: string
      cards: number[]
      round: $Enums.POKER_ROUND
      dealsCount: number
      dealerIndex: number
      currentPlayerIndex: number
    }, ExtArgs["result"]["pokerState"]>
    composites: {}
  }

  type PokerStateGetPayload<S extends boolean | null | undefined | PokerStateDefaultArgs> = $Result.GetResult<Prisma.$PokerStatePayload, S>

  type PokerStateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PokerStateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PokerStateCountAggregateInputType | true
    }

  export interface PokerStateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PokerState'], meta: { name: 'PokerState' } }
    /**
     * Find zero or one PokerState that matches the filter.
     * @param {PokerStateFindUniqueArgs} args - Arguments to find a PokerState
     * @example
     * // Get one PokerState
     * const pokerState = await prisma.pokerState.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PokerStateFindUniqueArgs>(args: SelectSubset<T, PokerStateFindUniqueArgs<ExtArgs>>): Prisma__PokerStateClient<$Result.GetResult<Prisma.$PokerStatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PokerState that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PokerStateFindUniqueOrThrowArgs} args - Arguments to find a PokerState
     * @example
     * // Get one PokerState
     * const pokerState = await prisma.pokerState.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PokerStateFindUniqueOrThrowArgs>(args: SelectSubset<T, PokerStateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PokerStateClient<$Result.GetResult<Prisma.$PokerStatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PokerState that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerStateFindFirstArgs} args - Arguments to find a PokerState
     * @example
     * // Get one PokerState
     * const pokerState = await prisma.pokerState.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PokerStateFindFirstArgs>(args?: SelectSubset<T, PokerStateFindFirstArgs<ExtArgs>>): Prisma__PokerStateClient<$Result.GetResult<Prisma.$PokerStatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PokerState that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerStateFindFirstOrThrowArgs} args - Arguments to find a PokerState
     * @example
     * // Get one PokerState
     * const pokerState = await prisma.pokerState.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PokerStateFindFirstOrThrowArgs>(args?: SelectSubset<T, PokerStateFindFirstOrThrowArgs<ExtArgs>>): Prisma__PokerStateClient<$Result.GetResult<Prisma.$PokerStatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PokerStates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerStateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PokerStates
     * const pokerStates = await prisma.pokerState.findMany()
     * 
     * // Get first 10 PokerStates
     * const pokerStates = await prisma.pokerState.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pokerStateWithIdOnly = await prisma.pokerState.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PokerStateFindManyArgs>(args?: SelectSubset<T, PokerStateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokerStatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PokerState.
     * @param {PokerStateCreateArgs} args - Arguments to create a PokerState.
     * @example
     * // Create one PokerState
     * const PokerState = await prisma.pokerState.create({
     *   data: {
     *     // ... data to create a PokerState
     *   }
     * })
     * 
     */
    create<T extends PokerStateCreateArgs>(args: SelectSubset<T, PokerStateCreateArgs<ExtArgs>>): Prisma__PokerStateClient<$Result.GetResult<Prisma.$PokerStatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PokerStates.
     * @param {PokerStateCreateManyArgs} args - Arguments to create many PokerStates.
     * @example
     * // Create many PokerStates
     * const pokerState = await prisma.pokerState.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PokerStateCreateManyArgs>(args?: SelectSubset<T, PokerStateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PokerStates and returns the data saved in the database.
     * @param {PokerStateCreateManyAndReturnArgs} args - Arguments to create many PokerStates.
     * @example
     * // Create many PokerStates
     * const pokerState = await prisma.pokerState.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PokerStates and only return the `id`
     * const pokerStateWithIdOnly = await prisma.pokerState.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PokerStateCreateManyAndReturnArgs>(args?: SelectSubset<T, PokerStateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokerStatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PokerState.
     * @param {PokerStateDeleteArgs} args - Arguments to delete one PokerState.
     * @example
     * // Delete one PokerState
     * const PokerState = await prisma.pokerState.delete({
     *   where: {
     *     // ... filter to delete one PokerState
     *   }
     * })
     * 
     */
    delete<T extends PokerStateDeleteArgs>(args: SelectSubset<T, PokerStateDeleteArgs<ExtArgs>>): Prisma__PokerStateClient<$Result.GetResult<Prisma.$PokerStatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PokerState.
     * @param {PokerStateUpdateArgs} args - Arguments to update one PokerState.
     * @example
     * // Update one PokerState
     * const pokerState = await prisma.pokerState.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PokerStateUpdateArgs>(args: SelectSubset<T, PokerStateUpdateArgs<ExtArgs>>): Prisma__PokerStateClient<$Result.GetResult<Prisma.$PokerStatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PokerStates.
     * @param {PokerStateDeleteManyArgs} args - Arguments to filter PokerStates to delete.
     * @example
     * // Delete a few PokerStates
     * const { count } = await prisma.pokerState.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PokerStateDeleteManyArgs>(args?: SelectSubset<T, PokerStateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PokerStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerStateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PokerStates
     * const pokerState = await prisma.pokerState.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PokerStateUpdateManyArgs>(args: SelectSubset<T, PokerStateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PokerStates and returns the data updated in the database.
     * @param {PokerStateUpdateManyAndReturnArgs} args - Arguments to update many PokerStates.
     * @example
     * // Update many PokerStates
     * const pokerState = await prisma.pokerState.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PokerStates and only return the `id`
     * const pokerStateWithIdOnly = await prisma.pokerState.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PokerStateUpdateManyAndReturnArgs>(args: SelectSubset<T, PokerStateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokerStatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PokerState.
     * @param {PokerStateUpsertArgs} args - Arguments to update or create a PokerState.
     * @example
     * // Update or create a PokerState
     * const pokerState = await prisma.pokerState.upsert({
     *   create: {
     *     // ... data to create a PokerState
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PokerState we want to update
     *   }
     * })
     */
    upsert<T extends PokerStateUpsertArgs>(args: SelectSubset<T, PokerStateUpsertArgs<ExtArgs>>): Prisma__PokerStateClient<$Result.GetResult<Prisma.$PokerStatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PokerStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerStateCountArgs} args - Arguments to filter PokerStates to count.
     * @example
     * // Count the number of PokerStates
     * const count = await prisma.pokerState.count({
     *   where: {
     *     // ... the filter for the PokerStates we want to count
     *   }
     * })
    **/
    count<T extends PokerStateCountArgs>(
      args?: Subset<T, PokerStateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PokerStateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PokerState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerStateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PokerStateAggregateArgs>(args: Subset<T, PokerStateAggregateArgs>): Prisma.PrismaPromise<GetPokerStateAggregateType<T>>

    /**
     * Group by PokerState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PokerStateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PokerStateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PokerStateGroupByArgs['orderBy'] }
        : { orderBy?: PokerStateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PokerStateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPokerStateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PokerState model
   */
  readonly fields: PokerStateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PokerState.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PokerStateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    players<T extends PokerState$playersArgs<ExtArgs> = {}>(args?: Subset<T, PokerState$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PokerPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PokerState model
   */
  interface PokerStateFieldRefs {
    readonly id: FieldRef<"PokerState", 'String'>
    readonly createdAt: FieldRef<"PokerState", 'DateTime'>
    readonly updatedAt: FieldRef<"PokerState", 'DateTime'>
    readonly tgChatId: FieldRef<"PokerState", 'String'>
    readonly cards: FieldRef<"PokerState", 'Int[]'>
    readonly round: FieldRef<"PokerState", 'POKER_ROUND'>
    readonly dealsCount: FieldRef<"PokerState", 'Int'>
    readonly dealerIndex: FieldRef<"PokerState", 'Int'>
    readonly currentPlayerIndex: FieldRef<"PokerState", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PokerState findUnique
   */
  export type PokerStateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerState
     */
    select?: PokerStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerState
     */
    omit?: PokerStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerStateInclude<ExtArgs> | null
    /**
     * Filter, which PokerState to fetch.
     */
    where: PokerStateWhereUniqueInput
  }

  /**
   * PokerState findUniqueOrThrow
   */
  export type PokerStateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerState
     */
    select?: PokerStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerState
     */
    omit?: PokerStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerStateInclude<ExtArgs> | null
    /**
     * Filter, which PokerState to fetch.
     */
    where: PokerStateWhereUniqueInput
  }

  /**
   * PokerState findFirst
   */
  export type PokerStateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerState
     */
    select?: PokerStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerState
     */
    omit?: PokerStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerStateInclude<ExtArgs> | null
    /**
     * Filter, which PokerState to fetch.
     */
    where?: PokerStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokerStates to fetch.
     */
    orderBy?: PokerStateOrderByWithRelationInput | PokerStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PokerStates.
     */
    cursor?: PokerStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokerStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokerStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PokerStates.
     */
    distinct?: PokerStateScalarFieldEnum | PokerStateScalarFieldEnum[]
  }

  /**
   * PokerState findFirstOrThrow
   */
  export type PokerStateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerState
     */
    select?: PokerStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerState
     */
    omit?: PokerStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerStateInclude<ExtArgs> | null
    /**
     * Filter, which PokerState to fetch.
     */
    where?: PokerStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokerStates to fetch.
     */
    orderBy?: PokerStateOrderByWithRelationInput | PokerStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PokerStates.
     */
    cursor?: PokerStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokerStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokerStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PokerStates.
     */
    distinct?: PokerStateScalarFieldEnum | PokerStateScalarFieldEnum[]
  }

  /**
   * PokerState findMany
   */
  export type PokerStateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerState
     */
    select?: PokerStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerState
     */
    omit?: PokerStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerStateInclude<ExtArgs> | null
    /**
     * Filter, which PokerStates to fetch.
     */
    where?: PokerStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PokerStates to fetch.
     */
    orderBy?: PokerStateOrderByWithRelationInput | PokerStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PokerStates.
     */
    cursor?: PokerStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PokerStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PokerStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PokerStates.
     */
    distinct?: PokerStateScalarFieldEnum | PokerStateScalarFieldEnum[]
  }

  /**
   * PokerState create
   */
  export type PokerStateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerState
     */
    select?: PokerStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerState
     */
    omit?: PokerStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerStateInclude<ExtArgs> | null
    /**
     * The data needed to create a PokerState.
     */
    data: XOR<PokerStateCreateInput, PokerStateUncheckedCreateInput>
  }

  /**
   * PokerState createMany
   */
  export type PokerStateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PokerStates.
     */
    data: PokerStateCreateManyInput | PokerStateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PokerState createManyAndReturn
   */
  export type PokerStateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerState
     */
    select?: PokerStateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PokerState
     */
    omit?: PokerStateOmit<ExtArgs> | null
    /**
     * The data used to create many PokerStates.
     */
    data: PokerStateCreateManyInput | PokerStateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PokerState update
   */
  export type PokerStateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerState
     */
    select?: PokerStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerState
     */
    omit?: PokerStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerStateInclude<ExtArgs> | null
    /**
     * The data needed to update a PokerState.
     */
    data: XOR<PokerStateUpdateInput, PokerStateUncheckedUpdateInput>
    /**
     * Choose, which PokerState to update.
     */
    where: PokerStateWhereUniqueInput
  }

  /**
   * PokerState updateMany
   */
  export type PokerStateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PokerStates.
     */
    data: XOR<PokerStateUpdateManyMutationInput, PokerStateUncheckedUpdateManyInput>
    /**
     * Filter which PokerStates to update
     */
    where?: PokerStateWhereInput
    /**
     * Limit how many PokerStates to update.
     */
    limit?: number
  }

  /**
   * PokerState updateManyAndReturn
   */
  export type PokerStateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerState
     */
    select?: PokerStateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PokerState
     */
    omit?: PokerStateOmit<ExtArgs> | null
    /**
     * The data used to update PokerStates.
     */
    data: XOR<PokerStateUpdateManyMutationInput, PokerStateUncheckedUpdateManyInput>
    /**
     * Filter which PokerStates to update
     */
    where?: PokerStateWhereInput
    /**
     * Limit how many PokerStates to update.
     */
    limit?: number
  }

  /**
   * PokerState upsert
   */
  export type PokerStateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerState
     */
    select?: PokerStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerState
     */
    omit?: PokerStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerStateInclude<ExtArgs> | null
    /**
     * The filter to search for the PokerState to update in case it exists.
     */
    where: PokerStateWhereUniqueInput
    /**
     * In case the PokerState found by the `where` argument doesn't exist, create a new PokerState with this data.
     */
    create: XOR<PokerStateCreateInput, PokerStateUncheckedCreateInput>
    /**
     * In case the PokerState was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PokerStateUpdateInput, PokerStateUncheckedUpdateInput>
  }

  /**
   * PokerState delete
   */
  export type PokerStateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerState
     */
    select?: PokerStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerState
     */
    omit?: PokerStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerStateInclude<ExtArgs> | null
    /**
     * Filter which PokerState to delete.
     */
    where: PokerStateWhereUniqueInput
  }

  /**
   * PokerState deleteMany
   */
  export type PokerStateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PokerStates to delete
     */
    where?: PokerStateWhereInput
    /**
     * Limit how many PokerStates to delete.
     */
    limit?: number
  }

  /**
   * PokerState.players
   */
  export type PokerState$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerPlayer
     */
    select?: PokerPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerPlayer
     */
    omit?: PokerPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerPlayerInclude<ExtArgs> | null
    where?: PokerPlayerWhereInput
    orderBy?: PokerPlayerOrderByWithRelationInput | PokerPlayerOrderByWithRelationInput[]
    cursor?: PokerPlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PokerPlayerScalarFieldEnum | PokerPlayerScalarFieldEnum[]
  }

  /**
   * PokerState without action
   */
  export type PokerStateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PokerState
     */
    select?: PokerStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PokerState
     */
    omit?: PokerStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PokerStateInclude<ExtArgs> | null
  }


  /**
   * Model PumpkinPlayer
   */

  export type AggregatePumpkinPlayer = {
    _count: PumpkinPlayerCountAggregateOutputType | null
    _min: PumpkinPlayerMinAggregateOutputType | null
    _max: PumpkinPlayerMaxAggregateOutputType | null
  }

  export type PumpkinPlayerMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tgChatId: string | null
    userId: string | null
  }

  export type PumpkinPlayerMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tgChatId: string | null
    userId: string | null
  }

  export type PumpkinPlayerCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    tgChatId: number
    userId: number
    _all: number
  }


  export type PumpkinPlayerMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    tgChatId?: true
    userId?: true
  }

  export type PumpkinPlayerMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    tgChatId?: true
    userId?: true
  }

  export type PumpkinPlayerCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    tgChatId?: true
    userId?: true
    _all?: true
  }

  export type PumpkinPlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PumpkinPlayer to aggregate.
     */
    where?: PumpkinPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PumpkinPlayers to fetch.
     */
    orderBy?: PumpkinPlayerOrderByWithRelationInput | PumpkinPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PumpkinPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PumpkinPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PumpkinPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PumpkinPlayers
    **/
    _count?: true | PumpkinPlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PumpkinPlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PumpkinPlayerMaxAggregateInputType
  }

  export type GetPumpkinPlayerAggregateType<T extends PumpkinPlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePumpkinPlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePumpkinPlayer[P]>
      : GetScalarType<T[P], AggregatePumpkinPlayer[P]>
  }




  export type PumpkinPlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PumpkinPlayerWhereInput
    orderBy?: PumpkinPlayerOrderByWithAggregationInput | PumpkinPlayerOrderByWithAggregationInput[]
    by: PumpkinPlayerScalarFieldEnum[] | PumpkinPlayerScalarFieldEnum
    having?: PumpkinPlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PumpkinPlayerCountAggregateInputType | true
    _min?: PumpkinPlayerMinAggregateInputType
    _max?: PumpkinPlayerMaxAggregateInputType
  }

  export type PumpkinPlayerGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    tgChatId: string
    userId: string
    _count: PumpkinPlayerCountAggregateOutputType | null
    _min: PumpkinPlayerMinAggregateOutputType | null
    _max: PumpkinPlayerMaxAggregateOutputType | null
  }

  type GetPumpkinPlayerGroupByPayload<T extends PumpkinPlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PumpkinPlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PumpkinPlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PumpkinPlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PumpkinPlayerGroupByOutputType[P]>
        }
      >
    >


  export type PumpkinPlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tgChatId?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    stats?: boolean | PumpkinPlayer$statsArgs<ExtArgs>
    _count?: boolean | PumpkinPlayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pumpkinPlayer"]>

  export type PumpkinPlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tgChatId?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pumpkinPlayer"]>

  export type PumpkinPlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tgChatId?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pumpkinPlayer"]>

  export type PumpkinPlayerSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tgChatId?: boolean
    userId?: boolean
  }

  export type PumpkinPlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "tgChatId" | "userId", ExtArgs["result"]["pumpkinPlayer"]>
  export type PumpkinPlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    stats?: boolean | PumpkinPlayer$statsArgs<ExtArgs>
    _count?: boolean | PumpkinPlayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PumpkinPlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PumpkinPlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PumpkinPlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PumpkinPlayer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      stats: Prisma.$PumpkinStatsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      tgChatId: string
      userId: string
    }, ExtArgs["result"]["pumpkinPlayer"]>
    composites: {}
  }

  type PumpkinPlayerGetPayload<S extends boolean | null | undefined | PumpkinPlayerDefaultArgs> = $Result.GetResult<Prisma.$PumpkinPlayerPayload, S>

  type PumpkinPlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PumpkinPlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PumpkinPlayerCountAggregateInputType | true
    }

  export interface PumpkinPlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PumpkinPlayer'], meta: { name: 'PumpkinPlayer' } }
    /**
     * Find zero or one PumpkinPlayer that matches the filter.
     * @param {PumpkinPlayerFindUniqueArgs} args - Arguments to find a PumpkinPlayer
     * @example
     * // Get one PumpkinPlayer
     * const pumpkinPlayer = await prisma.pumpkinPlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PumpkinPlayerFindUniqueArgs>(args: SelectSubset<T, PumpkinPlayerFindUniqueArgs<ExtArgs>>): Prisma__PumpkinPlayerClient<$Result.GetResult<Prisma.$PumpkinPlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PumpkinPlayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PumpkinPlayerFindUniqueOrThrowArgs} args - Arguments to find a PumpkinPlayer
     * @example
     * // Get one PumpkinPlayer
     * const pumpkinPlayer = await prisma.pumpkinPlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PumpkinPlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PumpkinPlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PumpkinPlayerClient<$Result.GetResult<Prisma.$PumpkinPlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PumpkinPlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinPlayerFindFirstArgs} args - Arguments to find a PumpkinPlayer
     * @example
     * // Get one PumpkinPlayer
     * const pumpkinPlayer = await prisma.pumpkinPlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PumpkinPlayerFindFirstArgs>(args?: SelectSubset<T, PumpkinPlayerFindFirstArgs<ExtArgs>>): Prisma__PumpkinPlayerClient<$Result.GetResult<Prisma.$PumpkinPlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PumpkinPlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinPlayerFindFirstOrThrowArgs} args - Arguments to find a PumpkinPlayer
     * @example
     * // Get one PumpkinPlayer
     * const pumpkinPlayer = await prisma.pumpkinPlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PumpkinPlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PumpkinPlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PumpkinPlayerClient<$Result.GetResult<Prisma.$PumpkinPlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PumpkinPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinPlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PumpkinPlayers
     * const pumpkinPlayers = await prisma.pumpkinPlayer.findMany()
     * 
     * // Get first 10 PumpkinPlayers
     * const pumpkinPlayers = await prisma.pumpkinPlayer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pumpkinPlayerWithIdOnly = await prisma.pumpkinPlayer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PumpkinPlayerFindManyArgs>(args?: SelectSubset<T, PumpkinPlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PumpkinPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PumpkinPlayer.
     * @param {PumpkinPlayerCreateArgs} args - Arguments to create a PumpkinPlayer.
     * @example
     * // Create one PumpkinPlayer
     * const PumpkinPlayer = await prisma.pumpkinPlayer.create({
     *   data: {
     *     // ... data to create a PumpkinPlayer
     *   }
     * })
     * 
     */
    create<T extends PumpkinPlayerCreateArgs>(args: SelectSubset<T, PumpkinPlayerCreateArgs<ExtArgs>>): Prisma__PumpkinPlayerClient<$Result.GetResult<Prisma.$PumpkinPlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PumpkinPlayers.
     * @param {PumpkinPlayerCreateManyArgs} args - Arguments to create many PumpkinPlayers.
     * @example
     * // Create many PumpkinPlayers
     * const pumpkinPlayer = await prisma.pumpkinPlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PumpkinPlayerCreateManyArgs>(args?: SelectSubset<T, PumpkinPlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PumpkinPlayers and returns the data saved in the database.
     * @param {PumpkinPlayerCreateManyAndReturnArgs} args - Arguments to create many PumpkinPlayers.
     * @example
     * // Create many PumpkinPlayers
     * const pumpkinPlayer = await prisma.pumpkinPlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PumpkinPlayers and only return the `id`
     * const pumpkinPlayerWithIdOnly = await prisma.pumpkinPlayer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PumpkinPlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PumpkinPlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PumpkinPlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PumpkinPlayer.
     * @param {PumpkinPlayerDeleteArgs} args - Arguments to delete one PumpkinPlayer.
     * @example
     * // Delete one PumpkinPlayer
     * const PumpkinPlayer = await prisma.pumpkinPlayer.delete({
     *   where: {
     *     // ... filter to delete one PumpkinPlayer
     *   }
     * })
     * 
     */
    delete<T extends PumpkinPlayerDeleteArgs>(args: SelectSubset<T, PumpkinPlayerDeleteArgs<ExtArgs>>): Prisma__PumpkinPlayerClient<$Result.GetResult<Prisma.$PumpkinPlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PumpkinPlayer.
     * @param {PumpkinPlayerUpdateArgs} args - Arguments to update one PumpkinPlayer.
     * @example
     * // Update one PumpkinPlayer
     * const pumpkinPlayer = await prisma.pumpkinPlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PumpkinPlayerUpdateArgs>(args: SelectSubset<T, PumpkinPlayerUpdateArgs<ExtArgs>>): Prisma__PumpkinPlayerClient<$Result.GetResult<Prisma.$PumpkinPlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PumpkinPlayers.
     * @param {PumpkinPlayerDeleteManyArgs} args - Arguments to filter PumpkinPlayers to delete.
     * @example
     * // Delete a few PumpkinPlayers
     * const { count } = await prisma.pumpkinPlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PumpkinPlayerDeleteManyArgs>(args?: SelectSubset<T, PumpkinPlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PumpkinPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinPlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PumpkinPlayers
     * const pumpkinPlayer = await prisma.pumpkinPlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PumpkinPlayerUpdateManyArgs>(args: SelectSubset<T, PumpkinPlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PumpkinPlayers and returns the data updated in the database.
     * @param {PumpkinPlayerUpdateManyAndReturnArgs} args - Arguments to update many PumpkinPlayers.
     * @example
     * // Update many PumpkinPlayers
     * const pumpkinPlayer = await prisma.pumpkinPlayer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PumpkinPlayers and only return the `id`
     * const pumpkinPlayerWithIdOnly = await prisma.pumpkinPlayer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PumpkinPlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, PumpkinPlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PumpkinPlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PumpkinPlayer.
     * @param {PumpkinPlayerUpsertArgs} args - Arguments to update or create a PumpkinPlayer.
     * @example
     * // Update or create a PumpkinPlayer
     * const pumpkinPlayer = await prisma.pumpkinPlayer.upsert({
     *   create: {
     *     // ... data to create a PumpkinPlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PumpkinPlayer we want to update
     *   }
     * })
     */
    upsert<T extends PumpkinPlayerUpsertArgs>(args: SelectSubset<T, PumpkinPlayerUpsertArgs<ExtArgs>>): Prisma__PumpkinPlayerClient<$Result.GetResult<Prisma.$PumpkinPlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PumpkinPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinPlayerCountArgs} args - Arguments to filter PumpkinPlayers to count.
     * @example
     * // Count the number of PumpkinPlayers
     * const count = await prisma.pumpkinPlayer.count({
     *   where: {
     *     // ... the filter for the PumpkinPlayers we want to count
     *   }
     * })
    **/
    count<T extends PumpkinPlayerCountArgs>(
      args?: Subset<T, PumpkinPlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PumpkinPlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PumpkinPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinPlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PumpkinPlayerAggregateArgs>(args: Subset<T, PumpkinPlayerAggregateArgs>): Prisma.PrismaPromise<GetPumpkinPlayerAggregateType<T>>

    /**
     * Group by PumpkinPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinPlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PumpkinPlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PumpkinPlayerGroupByArgs['orderBy'] }
        : { orderBy?: PumpkinPlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PumpkinPlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPumpkinPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PumpkinPlayer model
   */
  readonly fields: PumpkinPlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PumpkinPlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PumpkinPlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stats<T extends PumpkinPlayer$statsArgs<ExtArgs> = {}>(args?: Subset<T, PumpkinPlayer$statsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PumpkinStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PumpkinPlayer model
   */
  interface PumpkinPlayerFieldRefs {
    readonly id: FieldRef<"PumpkinPlayer", 'String'>
    readonly createdAt: FieldRef<"PumpkinPlayer", 'DateTime'>
    readonly updatedAt: FieldRef<"PumpkinPlayer", 'DateTime'>
    readonly tgChatId: FieldRef<"PumpkinPlayer", 'String'>
    readonly userId: FieldRef<"PumpkinPlayer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PumpkinPlayer findUnique
   */
  export type PumpkinPlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayer
     */
    select?: PumpkinPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinPlayer
     */
    omit?: PumpkinPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinPlayerInclude<ExtArgs> | null
    /**
     * Filter, which PumpkinPlayer to fetch.
     */
    where: PumpkinPlayerWhereUniqueInput
  }

  /**
   * PumpkinPlayer findUniqueOrThrow
   */
  export type PumpkinPlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayer
     */
    select?: PumpkinPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinPlayer
     */
    omit?: PumpkinPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinPlayerInclude<ExtArgs> | null
    /**
     * Filter, which PumpkinPlayer to fetch.
     */
    where: PumpkinPlayerWhereUniqueInput
  }

  /**
   * PumpkinPlayer findFirst
   */
  export type PumpkinPlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayer
     */
    select?: PumpkinPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinPlayer
     */
    omit?: PumpkinPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinPlayerInclude<ExtArgs> | null
    /**
     * Filter, which PumpkinPlayer to fetch.
     */
    where?: PumpkinPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PumpkinPlayers to fetch.
     */
    orderBy?: PumpkinPlayerOrderByWithRelationInput | PumpkinPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PumpkinPlayers.
     */
    cursor?: PumpkinPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PumpkinPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PumpkinPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PumpkinPlayers.
     */
    distinct?: PumpkinPlayerScalarFieldEnum | PumpkinPlayerScalarFieldEnum[]
  }

  /**
   * PumpkinPlayer findFirstOrThrow
   */
  export type PumpkinPlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayer
     */
    select?: PumpkinPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinPlayer
     */
    omit?: PumpkinPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinPlayerInclude<ExtArgs> | null
    /**
     * Filter, which PumpkinPlayer to fetch.
     */
    where?: PumpkinPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PumpkinPlayers to fetch.
     */
    orderBy?: PumpkinPlayerOrderByWithRelationInput | PumpkinPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PumpkinPlayers.
     */
    cursor?: PumpkinPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PumpkinPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PumpkinPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PumpkinPlayers.
     */
    distinct?: PumpkinPlayerScalarFieldEnum | PumpkinPlayerScalarFieldEnum[]
  }

  /**
   * PumpkinPlayer findMany
   */
  export type PumpkinPlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayer
     */
    select?: PumpkinPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinPlayer
     */
    omit?: PumpkinPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinPlayerInclude<ExtArgs> | null
    /**
     * Filter, which PumpkinPlayers to fetch.
     */
    where?: PumpkinPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PumpkinPlayers to fetch.
     */
    orderBy?: PumpkinPlayerOrderByWithRelationInput | PumpkinPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PumpkinPlayers.
     */
    cursor?: PumpkinPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PumpkinPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PumpkinPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PumpkinPlayers.
     */
    distinct?: PumpkinPlayerScalarFieldEnum | PumpkinPlayerScalarFieldEnum[]
  }

  /**
   * PumpkinPlayer create
   */
  export type PumpkinPlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayer
     */
    select?: PumpkinPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinPlayer
     */
    omit?: PumpkinPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinPlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a PumpkinPlayer.
     */
    data: XOR<PumpkinPlayerCreateInput, PumpkinPlayerUncheckedCreateInput>
  }

  /**
   * PumpkinPlayer createMany
   */
  export type PumpkinPlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PumpkinPlayers.
     */
    data: PumpkinPlayerCreateManyInput | PumpkinPlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PumpkinPlayer createManyAndReturn
   */
  export type PumpkinPlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayer
     */
    select?: PumpkinPlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinPlayer
     */
    omit?: PumpkinPlayerOmit<ExtArgs> | null
    /**
     * The data used to create many PumpkinPlayers.
     */
    data: PumpkinPlayerCreateManyInput | PumpkinPlayerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinPlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PumpkinPlayer update
   */
  export type PumpkinPlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayer
     */
    select?: PumpkinPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinPlayer
     */
    omit?: PumpkinPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinPlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a PumpkinPlayer.
     */
    data: XOR<PumpkinPlayerUpdateInput, PumpkinPlayerUncheckedUpdateInput>
    /**
     * Choose, which PumpkinPlayer to update.
     */
    where: PumpkinPlayerWhereUniqueInput
  }

  /**
   * PumpkinPlayer updateMany
   */
  export type PumpkinPlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PumpkinPlayers.
     */
    data: XOR<PumpkinPlayerUpdateManyMutationInput, PumpkinPlayerUncheckedUpdateManyInput>
    /**
     * Filter which PumpkinPlayers to update
     */
    where?: PumpkinPlayerWhereInput
    /**
     * Limit how many PumpkinPlayers to update.
     */
    limit?: number
  }

  /**
   * PumpkinPlayer updateManyAndReturn
   */
  export type PumpkinPlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayer
     */
    select?: PumpkinPlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinPlayer
     */
    omit?: PumpkinPlayerOmit<ExtArgs> | null
    /**
     * The data used to update PumpkinPlayers.
     */
    data: XOR<PumpkinPlayerUpdateManyMutationInput, PumpkinPlayerUncheckedUpdateManyInput>
    /**
     * Filter which PumpkinPlayers to update
     */
    where?: PumpkinPlayerWhereInput
    /**
     * Limit how many PumpkinPlayers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinPlayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PumpkinPlayer upsert
   */
  export type PumpkinPlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayer
     */
    select?: PumpkinPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinPlayer
     */
    omit?: PumpkinPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinPlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the PumpkinPlayer to update in case it exists.
     */
    where: PumpkinPlayerWhereUniqueInput
    /**
     * In case the PumpkinPlayer found by the `where` argument doesn't exist, create a new PumpkinPlayer with this data.
     */
    create: XOR<PumpkinPlayerCreateInput, PumpkinPlayerUncheckedCreateInput>
    /**
     * In case the PumpkinPlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PumpkinPlayerUpdateInput, PumpkinPlayerUncheckedUpdateInput>
  }

  /**
   * PumpkinPlayer delete
   */
  export type PumpkinPlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayer
     */
    select?: PumpkinPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinPlayer
     */
    omit?: PumpkinPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinPlayerInclude<ExtArgs> | null
    /**
     * Filter which PumpkinPlayer to delete.
     */
    where: PumpkinPlayerWhereUniqueInput
  }

  /**
   * PumpkinPlayer deleteMany
   */
  export type PumpkinPlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PumpkinPlayers to delete
     */
    where?: PumpkinPlayerWhereInput
    /**
     * Limit how many PumpkinPlayers to delete.
     */
    limit?: number
  }

  /**
   * PumpkinPlayer.stats
   */
  export type PumpkinPlayer$statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStats
     */
    select?: PumpkinStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStats
     */
    omit?: PumpkinStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinStatsInclude<ExtArgs> | null
    where?: PumpkinStatsWhereInput
    orderBy?: PumpkinStatsOrderByWithRelationInput | PumpkinStatsOrderByWithRelationInput[]
    cursor?: PumpkinStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PumpkinStatsScalarFieldEnum | PumpkinStatsScalarFieldEnum[]
  }

  /**
   * PumpkinPlayer without action
   */
  export type PumpkinPlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinPlayer
     */
    select?: PumpkinPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinPlayer
     */
    omit?: PumpkinPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinPlayerInclude<ExtArgs> | null
  }


  /**
   * Model PumpkinStats
   */

  export type AggregatePumpkinStats = {
    _count: PumpkinStatsCountAggregateOutputType | null
    _min: PumpkinStatsMinAggregateOutputType | null
    _max: PumpkinStatsMaxAggregateOutputType | null
  }

  export type PumpkinStatsMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    date: Date | null
    playerId: string | null
  }

  export type PumpkinStatsMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    date: Date | null
    playerId: string | null
  }

  export type PumpkinStatsCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    date: number
    playerId: number
    _all: number
  }


  export type PumpkinStatsMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    date?: true
    playerId?: true
  }

  export type PumpkinStatsMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    date?: true
    playerId?: true
  }

  export type PumpkinStatsCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    date?: true
    playerId?: true
    _all?: true
  }

  export type PumpkinStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PumpkinStats to aggregate.
     */
    where?: PumpkinStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PumpkinStats to fetch.
     */
    orderBy?: PumpkinStatsOrderByWithRelationInput | PumpkinStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PumpkinStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PumpkinStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PumpkinStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PumpkinStats
    **/
    _count?: true | PumpkinStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PumpkinStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PumpkinStatsMaxAggregateInputType
  }

  export type GetPumpkinStatsAggregateType<T extends PumpkinStatsAggregateArgs> = {
        [P in keyof T & keyof AggregatePumpkinStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePumpkinStats[P]>
      : GetScalarType<T[P], AggregatePumpkinStats[P]>
  }




  export type PumpkinStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PumpkinStatsWhereInput
    orderBy?: PumpkinStatsOrderByWithAggregationInput | PumpkinStatsOrderByWithAggregationInput[]
    by: PumpkinStatsScalarFieldEnum[] | PumpkinStatsScalarFieldEnum
    having?: PumpkinStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PumpkinStatsCountAggregateInputType | true
    _min?: PumpkinStatsMinAggregateInputType
    _max?: PumpkinStatsMaxAggregateInputType
  }

  export type PumpkinStatsGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    date: Date
    playerId: string
    _count: PumpkinStatsCountAggregateOutputType | null
    _min: PumpkinStatsMinAggregateOutputType | null
    _max: PumpkinStatsMaxAggregateOutputType | null
  }

  type GetPumpkinStatsGroupByPayload<T extends PumpkinStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PumpkinStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PumpkinStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PumpkinStatsGroupByOutputType[P]>
            : GetScalarType<T[P], PumpkinStatsGroupByOutputType[P]>
        }
      >
    >


  export type PumpkinStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    date?: boolean
    playerId?: boolean
    player?: boolean | PumpkinPlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pumpkinStats"]>

  export type PumpkinStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    date?: boolean
    playerId?: boolean
    player?: boolean | PumpkinPlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pumpkinStats"]>

  export type PumpkinStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    date?: boolean
    playerId?: boolean
    player?: boolean | PumpkinPlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pumpkinStats"]>

  export type PumpkinStatsSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    date?: boolean
    playerId?: boolean
  }

  export type PumpkinStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "date" | "playerId", ExtArgs["result"]["pumpkinStats"]>
  export type PumpkinStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PumpkinPlayerDefaultArgs<ExtArgs>
  }
  export type PumpkinStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PumpkinPlayerDefaultArgs<ExtArgs>
  }
  export type PumpkinStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PumpkinPlayerDefaultArgs<ExtArgs>
  }

  export type $PumpkinStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PumpkinStats"
    objects: {
      player: Prisma.$PumpkinPlayerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      date: Date
      playerId: string
    }, ExtArgs["result"]["pumpkinStats"]>
    composites: {}
  }

  type PumpkinStatsGetPayload<S extends boolean | null | undefined | PumpkinStatsDefaultArgs> = $Result.GetResult<Prisma.$PumpkinStatsPayload, S>

  type PumpkinStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PumpkinStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PumpkinStatsCountAggregateInputType | true
    }

  export interface PumpkinStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PumpkinStats'], meta: { name: 'PumpkinStats' } }
    /**
     * Find zero or one PumpkinStats that matches the filter.
     * @param {PumpkinStatsFindUniqueArgs} args - Arguments to find a PumpkinStats
     * @example
     * // Get one PumpkinStats
     * const pumpkinStats = await prisma.pumpkinStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PumpkinStatsFindUniqueArgs>(args: SelectSubset<T, PumpkinStatsFindUniqueArgs<ExtArgs>>): Prisma__PumpkinStatsClient<$Result.GetResult<Prisma.$PumpkinStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PumpkinStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PumpkinStatsFindUniqueOrThrowArgs} args - Arguments to find a PumpkinStats
     * @example
     * // Get one PumpkinStats
     * const pumpkinStats = await prisma.pumpkinStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PumpkinStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, PumpkinStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PumpkinStatsClient<$Result.GetResult<Prisma.$PumpkinStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PumpkinStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStatsFindFirstArgs} args - Arguments to find a PumpkinStats
     * @example
     * // Get one PumpkinStats
     * const pumpkinStats = await prisma.pumpkinStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PumpkinStatsFindFirstArgs>(args?: SelectSubset<T, PumpkinStatsFindFirstArgs<ExtArgs>>): Prisma__PumpkinStatsClient<$Result.GetResult<Prisma.$PumpkinStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PumpkinStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStatsFindFirstOrThrowArgs} args - Arguments to find a PumpkinStats
     * @example
     * // Get one PumpkinStats
     * const pumpkinStats = await prisma.pumpkinStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PumpkinStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, PumpkinStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PumpkinStatsClient<$Result.GetResult<Prisma.$PumpkinStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PumpkinStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PumpkinStats
     * const pumpkinStats = await prisma.pumpkinStats.findMany()
     * 
     * // Get first 10 PumpkinStats
     * const pumpkinStats = await prisma.pumpkinStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pumpkinStatsWithIdOnly = await prisma.pumpkinStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PumpkinStatsFindManyArgs>(args?: SelectSubset<T, PumpkinStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PumpkinStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PumpkinStats.
     * @param {PumpkinStatsCreateArgs} args - Arguments to create a PumpkinStats.
     * @example
     * // Create one PumpkinStats
     * const PumpkinStats = await prisma.pumpkinStats.create({
     *   data: {
     *     // ... data to create a PumpkinStats
     *   }
     * })
     * 
     */
    create<T extends PumpkinStatsCreateArgs>(args: SelectSubset<T, PumpkinStatsCreateArgs<ExtArgs>>): Prisma__PumpkinStatsClient<$Result.GetResult<Prisma.$PumpkinStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PumpkinStats.
     * @param {PumpkinStatsCreateManyArgs} args - Arguments to create many PumpkinStats.
     * @example
     * // Create many PumpkinStats
     * const pumpkinStats = await prisma.pumpkinStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PumpkinStatsCreateManyArgs>(args?: SelectSubset<T, PumpkinStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PumpkinStats and returns the data saved in the database.
     * @param {PumpkinStatsCreateManyAndReturnArgs} args - Arguments to create many PumpkinStats.
     * @example
     * // Create many PumpkinStats
     * const pumpkinStats = await prisma.pumpkinStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PumpkinStats and only return the `id`
     * const pumpkinStatsWithIdOnly = await prisma.pumpkinStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PumpkinStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, PumpkinStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PumpkinStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PumpkinStats.
     * @param {PumpkinStatsDeleteArgs} args - Arguments to delete one PumpkinStats.
     * @example
     * // Delete one PumpkinStats
     * const PumpkinStats = await prisma.pumpkinStats.delete({
     *   where: {
     *     // ... filter to delete one PumpkinStats
     *   }
     * })
     * 
     */
    delete<T extends PumpkinStatsDeleteArgs>(args: SelectSubset<T, PumpkinStatsDeleteArgs<ExtArgs>>): Prisma__PumpkinStatsClient<$Result.GetResult<Prisma.$PumpkinStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PumpkinStats.
     * @param {PumpkinStatsUpdateArgs} args - Arguments to update one PumpkinStats.
     * @example
     * // Update one PumpkinStats
     * const pumpkinStats = await prisma.pumpkinStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PumpkinStatsUpdateArgs>(args: SelectSubset<T, PumpkinStatsUpdateArgs<ExtArgs>>): Prisma__PumpkinStatsClient<$Result.GetResult<Prisma.$PumpkinStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PumpkinStats.
     * @param {PumpkinStatsDeleteManyArgs} args - Arguments to filter PumpkinStats to delete.
     * @example
     * // Delete a few PumpkinStats
     * const { count } = await prisma.pumpkinStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PumpkinStatsDeleteManyArgs>(args?: SelectSubset<T, PumpkinStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PumpkinStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PumpkinStats
     * const pumpkinStats = await prisma.pumpkinStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PumpkinStatsUpdateManyArgs>(args: SelectSubset<T, PumpkinStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PumpkinStats and returns the data updated in the database.
     * @param {PumpkinStatsUpdateManyAndReturnArgs} args - Arguments to update many PumpkinStats.
     * @example
     * // Update many PumpkinStats
     * const pumpkinStats = await prisma.pumpkinStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PumpkinStats and only return the `id`
     * const pumpkinStatsWithIdOnly = await prisma.pumpkinStats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PumpkinStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, PumpkinStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PumpkinStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PumpkinStats.
     * @param {PumpkinStatsUpsertArgs} args - Arguments to update or create a PumpkinStats.
     * @example
     * // Update or create a PumpkinStats
     * const pumpkinStats = await prisma.pumpkinStats.upsert({
     *   create: {
     *     // ... data to create a PumpkinStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PumpkinStats we want to update
     *   }
     * })
     */
    upsert<T extends PumpkinStatsUpsertArgs>(args: SelectSubset<T, PumpkinStatsUpsertArgs<ExtArgs>>): Prisma__PumpkinStatsClient<$Result.GetResult<Prisma.$PumpkinStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PumpkinStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStatsCountArgs} args - Arguments to filter PumpkinStats to count.
     * @example
     * // Count the number of PumpkinStats
     * const count = await prisma.pumpkinStats.count({
     *   where: {
     *     // ... the filter for the PumpkinStats we want to count
     *   }
     * })
    **/
    count<T extends PumpkinStatsCountArgs>(
      args?: Subset<T, PumpkinStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PumpkinStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PumpkinStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PumpkinStatsAggregateArgs>(args: Subset<T, PumpkinStatsAggregateArgs>): Prisma.PrismaPromise<GetPumpkinStatsAggregateType<T>>

    /**
     * Group by PumpkinStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PumpkinStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PumpkinStatsGroupByArgs['orderBy'] }
        : { orderBy?: PumpkinStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PumpkinStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPumpkinStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PumpkinStats model
   */
  readonly fields: PumpkinStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PumpkinStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PumpkinStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    player<T extends PumpkinPlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PumpkinPlayerDefaultArgs<ExtArgs>>): Prisma__PumpkinPlayerClient<$Result.GetResult<Prisma.$PumpkinPlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PumpkinStats model
   */
  interface PumpkinStatsFieldRefs {
    readonly id: FieldRef<"PumpkinStats", 'String'>
    readonly createdAt: FieldRef<"PumpkinStats", 'DateTime'>
    readonly updatedAt: FieldRef<"PumpkinStats", 'DateTime'>
    readonly date: FieldRef<"PumpkinStats", 'DateTime'>
    readonly playerId: FieldRef<"PumpkinStats", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PumpkinStats findUnique
   */
  export type PumpkinStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStats
     */
    select?: PumpkinStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStats
     */
    omit?: PumpkinStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinStatsInclude<ExtArgs> | null
    /**
     * Filter, which PumpkinStats to fetch.
     */
    where: PumpkinStatsWhereUniqueInput
  }

  /**
   * PumpkinStats findUniqueOrThrow
   */
  export type PumpkinStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStats
     */
    select?: PumpkinStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStats
     */
    omit?: PumpkinStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinStatsInclude<ExtArgs> | null
    /**
     * Filter, which PumpkinStats to fetch.
     */
    where: PumpkinStatsWhereUniqueInput
  }

  /**
   * PumpkinStats findFirst
   */
  export type PumpkinStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStats
     */
    select?: PumpkinStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStats
     */
    omit?: PumpkinStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinStatsInclude<ExtArgs> | null
    /**
     * Filter, which PumpkinStats to fetch.
     */
    where?: PumpkinStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PumpkinStats to fetch.
     */
    orderBy?: PumpkinStatsOrderByWithRelationInput | PumpkinStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PumpkinStats.
     */
    cursor?: PumpkinStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PumpkinStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PumpkinStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PumpkinStats.
     */
    distinct?: PumpkinStatsScalarFieldEnum | PumpkinStatsScalarFieldEnum[]
  }

  /**
   * PumpkinStats findFirstOrThrow
   */
  export type PumpkinStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStats
     */
    select?: PumpkinStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStats
     */
    omit?: PumpkinStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinStatsInclude<ExtArgs> | null
    /**
     * Filter, which PumpkinStats to fetch.
     */
    where?: PumpkinStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PumpkinStats to fetch.
     */
    orderBy?: PumpkinStatsOrderByWithRelationInput | PumpkinStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PumpkinStats.
     */
    cursor?: PumpkinStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PumpkinStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PumpkinStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PumpkinStats.
     */
    distinct?: PumpkinStatsScalarFieldEnum | PumpkinStatsScalarFieldEnum[]
  }

  /**
   * PumpkinStats findMany
   */
  export type PumpkinStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStats
     */
    select?: PumpkinStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStats
     */
    omit?: PumpkinStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinStatsInclude<ExtArgs> | null
    /**
     * Filter, which PumpkinStats to fetch.
     */
    where?: PumpkinStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PumpkinStats to fetch.
     */
    orderBy?: PumpkinStatsOrderByWithRelationInput | PumpkinStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PumpkinStats.
     */
    cursor?: PumpkinStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PumpkinStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PumpkinStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PumpkinStats.
     */
    distinct?: PumpkinStatsScalarFieldEnum | PumpkinStatsScalarFieldEnum[]
  }

  /**
   * PumpkinStats create
   */
  export type PumpkinStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStats
     */
    select?: PumpkinStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStats
     */
    omit?: PumpkinStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a PumpkinStats.
     */
    data: XOR<PumpkinStatsCreateInput, PumpkinStatsUncheckedCreateInput>
  }

  /**
   * PumpkinStats createMany
   */
  export type PumpkinStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PumpkinStats.
     */
    data: PumpkinStatsCreateManyInput | PumpkinStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PumpkinStats createManyAndReturn
   */
  export type PumpkinStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStats
     */
    select?: PumpkinStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStats
     */
    omit?: PumpkinStatsOmit<ExtArgs> | null
    /**
     * The data used to create many PumpkinStats.
     */
    data: PumpkinStatsCreateManyInput | PumpkinStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PumpkinStats update
   */
  export type PumpkinStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStats
     */
    select?: PumpkinStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStats
     */
    omit?: PumpkinStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a PumpkinStats.
     */
    data: XOR<PumpkinStatsUpdateInput, PumpkinStatsUncheckedUpdateInput>
    /**
     * Choose, which PumpkinStats to update.
     */
    where: PumpkinStatsWhereUniqueInput
  }

  /**
   * PumpkinStats updateMany
   */
  export type PumpkinStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PumpkinStats.
     */
    data: XOR<PumpkinStatsUpdateManyMutationInput, PumpkinStatsUncheckedUpdateManyInput>
    /**
     * Filter which PumpkinStats to update
     */
    where?: PumpkinStatsWhereInput
    /**
     * Limit how many PumpkinStats to update.
     */
    limit?: number
  }

  /**
   * PumpkinStats updateManyAndReturn
   */
  export type PumpkinStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStats
     */
    select?: PumpkinStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStats
     */
    omit?: PumpkinStatsOmit<ExtArgs> | null
    /**
     * The data used to update PumpkinStats.
     */
    data: XOR<PumpkinStatsUpdateManyMutationInput, PumpkinStatsUncheckedUpdateManyInput>
    /**
     * Filter which PumpkinStats to update
     */
    where?: PumpkinStatsWhereInput
    /**
     * Limit how many PumpkinStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PumpkinStats upsert
   */
  export type PumpkinStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStats
     */
    select?: PumpkinStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStats
     */
    omit?: PumpkinStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the PumpkinStats to update in case it exists.
     */
    where: PumpkinStatsWhereUniqueInput
    /**
     * In case the PumpkinStats found by the `where` argument doesn't exist, create a new PumpkinStats with this data.
     */
    create: XOR<PumpkinStatsCreateInput, PumpkinStatsUncheckedCreateInput>
    /**
     * In case the PumpkinStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PumpkinStatsUpdateInput, PumpkinStatsUncheckedUpdateInput>
  }

  /**
   * PumpkinStats delete
   */
  export type PumpkinStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStats
     */
    select?: PumpkinStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStats
     */
    omit?: PumpkinStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinStatsInclude<ExtArgs> | null
    /**
     * Filter which PumpkinStats to delete.
     */
    where: PumpkinStatsWhereUniqueInput
  }

  /**
   * PumpkinStats deleteMany
   */
  export type PumpkinStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PumpkinStats to delete
     */
    where?: PumpkinStatsWhereInput
    /**
     * Limit how many PumpkinStats to delete.
     */
    limit?: number
  }

  /**
   * PumpkinStats without action
   */
  export type PumpkinStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStats
     */
    select?: PumpkinStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStats
     */
    omit?: PumpkinStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PumpkinStatsInclude<ExtArgs> | null
  }


  /**
   * Model PumpkinStrings
   */

  export type AggregatePumpkinStrings = {
    _count: PumpkinStringsCountAggregateOutputType | null
    _min: PumpkinStringsMinAggregateOutputType | null
    _max: PumpkinStringsMaxAggregateOutputType | null
  }

  export type PumpkinStringsMinAggregateOutputType = {
    id: string | null
  }

  export type PumpkinStringsMaxAggregateOutputType = {
    id: string | null
  }

  export type PumpkinStringsCountAggregateOutputType = {
    id: number
    tgChatIds: number
    hello: number
    notEnoughPlayers: number
    earlyWinner: number
    newWinner1: number
    newWinner2: number
    newWinner3: number
    newWinner4: number
    newWinnerNewYear: number
    pumpkinOfYear: number
    replyForWinner: number
    statsTitleAllTime: number
    statsTitleYear: number
    statsPlayer: number
    statsTotalPlayers: number
    _all: number
  }


  export type PumpkinStringsMinAggregateInputType = {
    id?: true
  }

  export type PumpkinStringsMaxAggregateInputType = {
    id?: true
  }

  export type PumpkinStringsCountAggregateInputType = {
    id?: true
    tgChatIds?: true
    hello?: true
    notEnoughPlayers?: true
    earlyWinner?: true
    newWinner1?: true
    newWinner2?: true
    newWinner3?: true
    newWinner4?: true
    newWinnerNewYear?: true
    pumpkinOfYear?: true
    replyForWinner?: true
    statsTitleAllTime?: true
    statsTitleYear?: true
    statsPlayer?: true
    statsTotalPlayers?: true
    _all?: true
  }

  export type PumpkinStringsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PumpkinStrings to aggregate.
     */
    where?: PumpkinStringsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PumpkinStrings to fetch.
     */
    orderBy?: PumpkinStringsOrderByWithRelationInput | PumpkinStringsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PumpkinStringsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PumpkinStrings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PumpkinStrings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PumpkinStrings
    **/
    _count?: true | PumpkinStringsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PumpkinStringsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PumpkinStringsMaxAggregateInputType
  }

  export type GetPumpkinStringsAggregateType<T extends PumpkinStringsAggregateArgs> = {
        [P in keyof T & keyof AggregatePumpkinStrings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePumpkinStrings[P]>
      : GetScalarType<T[P], AggregatePumpkinStrings[P]>
  }




  export type PumpkinStringsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PumpkinStringsWhereInput
    orderBy?: PumpkinStringsOrderByWithAggregationInput | PumpkinStringsOrderByWithAggregationInput[]
    by: PumpkinStringsScalarFieldEnum[] | PumpkinStringsScalarFieldEnum
    having?: PumpkinStringsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PumpkinStringsCountAggregateInputType | true
    _min?: PumpkinStringsMinAggregateInputType
    _max?: PumpkinStringsMaxAggregateInputType
  }

  export type PumpkinStringsGroupByOutputType = {
    id: string
    tgChatIds: string[]
    hello: string[]
    notEnoughPlayers: string[]
    earlyWinner: string[]
    newWinner1: string[]
    newWinner2: string[]
    newWinner3: string[]
    newWinner4: string[]
    newWinnerNewYear: string[]
    pumpkinOfYear: string[]
    replyForWinner: string[]
    statsTitleAllTime: string[]
    statsTitleYear: string[]
    statsPlayer: string[]
    statsTotalPlayers: string[]
    _count: PumpkinStringsCountAggregateOutputType | null
    _min: PumpkinStringsMinAggregateOutputType | null
    _max: PumpkinStringsMaxAggregateOutputType | null
  }

  type GetPumpkinStringsGroupByPayload<T extends PumpkinStringsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PumpkinStringsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PumpkinStringsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PumpkinStringsGroupByOutputType[P]>
            : GetScalarType<T[P], PumpkinStringsGroupByOutputType[P]>
        }
      >
    >


  export type PumpkinStringsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tgChatIds?: boolean
    hello?: boolean
    notEnoughPlayers?: boolean
    earlyWinner?: boolean
    newWinner1?: boolean
    newWinner2?: boolean
    newWinner3?: boolean
    newWinner4?: boolean
    newWinnerNewYear?: boolean
    pumpkinOfYear?: boolean
    replyForWinner?: boolean
    statsTitleAllTime?: boolean
    statsTitleYear?: boolean
    statsPlayer?: boolean
    statsTotalPlayers?: boolean
  }, ExtArgs["result"]["pumpkinStrings"]>

  export type PumpkinStringsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tgChatIds?: boolean
    hello?: boolean
    notEnoughPlayers?: boolean
    earlyWinner?: boolean
    newWinner1?: boolean
    newWinner2?: boolean
    newWinner3?: boolean
    newWinner4?: boolean
    newWinnerNewYear?: boolean
    pumpkinOfYear?: boolean
    replyForWinner?: boolean
    statsTitleAllTime?: boolean
    statsTitleYear?: boolean
    statsPlayer?: boolean
    statsTotalPlayers?: boolean
  }, ExtArgs["result"]["pumpkinStrings"]>

  export type PumpkinStringsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tgChatIds?: boolean
    hello?: boolean
    notEnoughPlayers?: boolean
    earlyWinner?: boolean
    newWinner1?: boolean
    newWinner2?: boolean
    newWinner3?: boolean
    newWinner4?: boolean
    newWinnerNewYear?: boolean
    pumpkinOfYear?: boolean
    replyForWinner?: boolean
    statsTitleAllTime?: boolean
    statsTitleYear?: boolean
    statsPlayer?: boolean
    statsTotalPlayers?: boolean
  }, ExtArgs["result"]["pumpkinStrings"]>

  export type PumpkinStringsSelectScalar = {
    id?: boolean
    tgChatIds?: boolean
    hello?: boolean
    notEnoughPlayers?: boolean
    earlyWinner?: boolean
    newWinner1?: boolean
    newWinner2?: boolean
    newWinner3?: boolean
    newWinner4?: boolean
    newWinnerNewYear?: boolean
    pumpkinOfYear?: boolean
    replyForWinner?: boolean
    statsTitleAllTime?: boolean
    statsTitleYear?: boolean
    statsPlayer?: boolean
    statsTotalPlayers?: boolean
  }

  export type PumpkinStringsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tgChatIds" | "hello" | "notEnoughPlayers" | "earlyWinner" | "newWinner1" | "newWinner2" | "newWinner3" | "newWinner4" | "newWinnerNewYear" | "pumpkinOfYear" | "replyForWinner" | "statsTitleAllTime" | "statsTitleYear" | "statsPlayer" | "statsTotalPlayers", ExtArgs["result"]["pumpkinStrings"]>

  export type $PumpkinStringsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PumpkinStrings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tgChatIds: string[]
      hello: string[]
      notEnoughPlayers: string[]
      earlyWinner: string[]
      newWinner1: string[]
      newWinner2: string[]
      newWinner3: string[]
      newWinner4: string[]
      newWinnerNewYear: string[]
      pumpkinOfYear: string[]
      replyForWinner: string[]
      statsTitleAllTime: string[]
      statsTitleYear: string[]
      statsPlayer: string[]
      statsTotalPlayers: string[]
    }, ExtArgs["result"]["pumpkinStrings"]>
    composites: {}
  }

  type PumpkinStringsGetPayload<S extends boolean | null | undefined | PumpkinStringsDefaultArgs> = $Result.GetResult<Prisma.$PumpkinStringsPayload, S>

  type PumpkinStringsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PumpkinStringsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PumpkinStringsCountAggregateInputType | true
    }

  export interface PumpkinStringsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PumpkinStrings'], meta: { name: 'PumpkinStrings' } }
    /**
     * Find zero or one PumpkinStrings that matches the filter.
     * @param {PumpkinStringsFindUniqueArgs} args - Arguments to find a PumpkinStrings
     * @example
     * // Get one PumpkinStrings
     * const pumpkinStrings = await prisma.pumpkinStrings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PumpkinStringsFindUniqueArgs>(args: SelectSubset<T, PumpkinStringsFindUniqueArgs<ExtArgs>>): Prisma__PumpkinStringsClient<$Result.GetResult<Prisma.$PumpkinStringsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PumpkinStrings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PumpkinStringsFindUniqueOrThrowArgs} args - Arguments to find a PumpkinStrings
     * @example
     * // Get one PumpkinStrings
     * const pumpkinStrings = await prisma.pumpkinStrings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PumpkinStringsFindUniqueOrThrowArgs>(args: SelectSubset<T, PumpkinStringsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PumpkinStringsClient<$Result.GetResult<Prisma.$PumpkinStringsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PumpkinStrings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStringsFindFirstArgs} args - Arguments to find a PumpkinStrings
     * @example
     * // Get one PumpkinStrings
     * const pumpkinStrings = await prisma.pumpkinStrings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PumpkinStringsFindFirstArgs>(args?: SelectSubset<T, PumpkinStringsFindFirstArgs<ExtArgs>>): Prisma__PumpkinStringsClient<$Result.GetResult<Prisma.$PumpkinStringsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PumpkinStrings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStringsFindFirstOrThrowArgs} args - Arguments to find a PumpkinStrings
     * @example
     * // Get one PumpkinStrings
     * const pumpkinStrings = await prisma.pumpkinStrings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PumpkinStringsFindFirstOrThrowArgs>(args?: SelectSubset<T, PumpkinStringsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PumpkinStringsClient<$Result.GetResult<Prisma.$PumpkinStringsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PumpkinStrings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStringsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PumpkinStrings
     * const pumpkinStrings = await prisma.pumpkinStrings.findMany()
     * 
     * // Get first 10 PumpkinStrings
     * const pumpkinStrings = await prisma.pumpkinStrings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pumpkinStringsWithIdOnly = await prisma.pumpkinStrings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PumpkinStringsFindManyArgs>(args?: SelectSubset<T, PumpkinStringsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PumpkinStringsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PumpkinStrings.
     * @param {PumpkinStringsCreateArgs} args - Arguments to create a PumpkinStrings.
     * @example
     * // Create one PumpkinStrings
     * const PumpkinStrings = await prisma.pumpkinStrings.create({
     *   data: {
     *     // ... data to create a PumpkinStrings
     *   }
     * })
     * 
     */
    create<T extends PumpkinStringsCreateArgs>(args: SelectSubset<T, PumpkinStringsCreateArgs<ExtArgs>>): Prisma__PumpkinStringsClient<$Result.GetResult<Prisma.$PumpkinStringsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PumpkinStrings.
     * @param {PumpkinStringsCreateManyArgs} args - Arguments to create many PumpkinStrings.
     * @example
     * // Create many PumpkinStrings
     * const pumpkinStrings = await prisma.pumpkinStrings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PumpkinStringsCreateManyArgs>(args?: SelectSubset<T, PumpkinStringsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PumpkinStrings and returns the data saved in the database.
     * @param {PumpkinStringsCreateManyAndReturnArgs} args - Arguments to create many PumpkinStrings.
     * @example
     * // Create many PumpkinStrings
     * const pumpkinStrings = await prisma.pumpkinStrings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PumpkinStrings and only return the `id`
     * const pumpkinStringsWithIdOnly = await prisma.pumpkinStrings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PumpkinStringsCreateManyAndReturnArgs>(args?: SelectSubset<T, PumpkinStringsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PumpkinStringsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PumpkinStrings.
     * @param {PumpkinStringsDeleteArgs} args - Arguments to delete one PumpkinStrings.
     * @example
     * // Delete one PumpkinStrings
     * const PumpkinStrings = await prisma.pumpkinStrings.delete({
     *   where: {
     *     // ... filter to delete one PumpkinStrings
     *   }
     * })
     * 
     */
    delete<T extends PumpkinStringsDeleteArgs>(args: SelectSubset<T, PumpkinStringsDeleteArgs<ExtArgs>>): Prisma__PumpkinStringsClient<$Result.GetResult<Prisma.$PumpkinStringsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PumpkinStrings.
     * @param {PumpkinStringsUpdateArgs} args - Arguments to update one PumpkinStrings.
     * @example
     * // Update one PumpkinStrings
     * const pumpkinStrings = await prisma.pumpkinStrings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PumpkinStringsUpdateArgs>(args: SelectSubset<T, PumpkinStringsUpdateArgs<ExtArgs>>): Prisma__PumpkinStringsClient<$Result.GetResult<Prisma.$PumpkinStringsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PumpkinStrings.
     * @param {PumpkinStringsDeleteManyArgs} args - Arguments to filter PumpkinStrings to delete.
     * @example
     * // Delete a few PumpkinStrings
     * const { count } = await prisma.pumpkinStrings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PumpkinStringsDeleteManyArgs>(args?: SelectSubset<T, PumpkinStringsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PumpkinStrings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStringsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PumpkinStrings
     * const pumpkinStrings = await prisma.pumpkinStrings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PumpkinStringsUpdateManyArgs>(args: SelectSubset<T, PumpkinStringsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PumpkinStrings and returns the data updated in the database.
     * @param {PumpkinStringsUpdateManyAndReturnArgs} args - Arguments to update many PumpkinStrings.
     * @example
     * // Update many PumpkinStrings
     * const pumpkinStrings = await prisma.pumpkinStrings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PumpkinStrings and only return the `id`
     * const pumpkinStringsWithIdOnly = await prisma.pumpkinStrings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PumpkinStringsUpdateManyAndReturnArgs>(args: SelectSubset<T, PumpkinStringsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PumpkinStringsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PumpkinStrings.
     * @param {PumpkinStringsUpsertArgs} args - Arguments to update or create a PumpkinStrings.
     * @example
     * // Update or create a PumpkinStrings
     * const pumpkinStrings = await prisma.pumpkinStrings.upsert({
     *   create: {
     *     // ... data to create a PumpkinStrings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PumpkinStrings we want to update
     *   }
     * })
     */
    upsert<T extends PumpkinStringsUpsertArgs>(args: SelectSubset<T, PumpkinStringsUpsertArgs<ExtArgs>>): Prisma__PumpkinStringsClient<$Result.GetResult<Prisma.$PumpkinStringsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PumpkinStrings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStringsCountArgs} args - Arguments to filter PumpkinStrings to count.
     * @example
     * // Count the number of PumpkinStrings
     * const count = await prisma.pumpkinStrings.count({
     *   where: {
     *     // ... the filter for the PumpkinStrings we want to count
     *   }
     * })
    **/
    count<T extends PumpkinStringsCountArgs>(
      args?: Subset<T, PumpkinStringsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PumpkinStringsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PumpkinStrings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStringsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PumpkinStringsAggregateArgs>(args: Subset<T, PumpkinStringsAggregateArgs>): Prisma.PrismaPromise<GetPumpkinStringsAggregateType<T>>

    /**
     * Group by PumpkinStrings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PumpkinStringsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PumpkinStringsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PumpkinStringsGroupByArgs['orderBy'] }
        : { orderBy?: PumpkinStringsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PumpkinStringsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPumpkinStringsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PumpkinStrings model
   */
  readonly fields: PumpkinStringsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PumpkinStrings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PumpkinStringsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PumpkinStrings model
   */
  interface PumpkinStringsFieldRefs {
    readonly id: FieldRef<"PumpkinStrings", 'String'>
    readonly tgChatIds: FieldRef<"PumpkinStrings", 'String[]'>
    readonly hello: FieldRef<"PumpkinStrings", 'String[]'>
    readonly notEnoughPlayers: FieldRef<"PumpkinStrings", 'String[]'>
    readonly earlyWinner: FieldRef<"PumpkinStrings", 'String[]'>
    readonly newWinner1: FieldRef<"PumpkinStrings", 'String[]'>
    readonly newWinner2: FieldRef<"PumpkinStrings", 'String[]'>
    readonly newWinner3: FieldRef<"PumpkinStrings", 'String[]'>
    readonly newWinner4: FieldRef<"PumpkinStrings", 'String[]'>
    readonly newWinnerNewYear: FieldRef<"PumpkinStrings", 'String[]'>
    readonly pumpkinOfYear: FieldRef<"PumpkinStrings", 'String[]'>
    readonly replyForWinner: FieldRef<"PumpkinStrings", 'String[]'>
    readonly statsTitleAllTime: FieldRef<"PumpkinStrings", 'String[]'>
    readonly statsTitleYear: FieldRef<"PumpkinStrings", 'String[]'>
    readonly statsPlayer: FieldRef<"PumpkinStrings", 'String[]'>
    readonly statsTotalPlayers: FieldRef<"PumpkinStrings", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * PumpkinStrings findUnique
   */
  export type PumpkinStringsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStrings
     */
    select?: PumpkinStringsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStrings
     */
    omit?: PumpkinStringsOmit<ExtArgs> | null
    /**
     * Filter, which PumpkinStrings to fetch.
     */
    where: PumpkinStringsWhereUniqueInput
  }

  /**
   * PumpkinStrings findUniqueOrThrow
   */
  export type PumpkinStringsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStrings
     */
    select?: PumpkinStringsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStrings
     */
    omit?: PumpkinStringsOmit<ExtArgs> | null
    /**
     * Filter, which PumpkinStrings to fetch.
     */
    where: PumpkinStringsWhereUniqueInput
  }

  /**
   * PumpkinStrings findFirst
   */
  export type PumpkinStringsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStrings
     */
    select?: PumpkinStringsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStrings
     */
    omit?: PumpkinStringsOmit<ExtArgs> | null
    /**
     * Filter, which PumpkinStrings to fetch.
     */
    where?: PumpkinStringsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PumpkinStrings to fetch.
     */
    orderBy?: PumpkinStringsOrderByWithRelationInput | PumpkinStringsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PumpkinStrings.
     */
    cursor?: PumpkinStringsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PumpkinStrings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PumpkinStrings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PumpkinStrings.
     */
    distinct?: PumpkinStringsScalarFieldEnum | PumpkinStringsScalarFieldEnum[]
  }

  /**
   * PumpkinStrings findFirstOrThrow
   */
  export type PumpkinStringsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStrings
     */
    select?: PumpkinStringsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStrings
     */
    omit?: PumpkinStringsOmit<ExtArgs> | null
    /**
     * Filter, which PumpkinStrings to fetch.
     */
    where?: PumpkinStringsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PumpkinStrings to fetch.
     */
    orderBy?: PumpkinStringsOrderByWithRelationInput | PumpkinStringsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PumpkinStrings.
     */
    cursor?: PumpkinStringsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PumpkinStrings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PumpkinStrings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PumpkinStrings.
     */
    distinct?: PumpkinStringsScalarFieldEnum | PumpkinStringsScalarFieldEnum[]
  }

  /**
   * PumpkinStrings findMany
   */
  export type PumpkinStringsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStrings
     */
    select?: PumpkinStringsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStrings
     */
    omit?: PumpkinStringsOmit<ExtArgs> | null
    /**
     * Filter, which PumpkinStrings to fetch.
     */
    where?: PumpkinStringsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PumpkinStrings to fetch.
     */
    orderBy?: PumpkinStringsOrderByWithRelationInput | PumpkinStringsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PumpkinStrings.
     */
    cursor?: PumpkinStringsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PumpkinStrings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PumpkinStrings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PumpkinStrings.
     */
    distinct?: PumpkinStringsScalarFieldEnum | PumpkinStringsScalarFieldEnum[]
  }

  /**
   * PumpkinStrings create
   */
  export type PumpkinStringsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStrings
     */
    select?: PumpkinStringsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStrings
     */
    omit?: PumpkinStringsOmit<ExtArgs> | null
    /**
     * The data needed to create a PumpkinStrings.
     */
    data?: XOR<PumpkinStringsCreateInput, PumpkinStringsUncheckedCreateInput>
  }

  /**
   * PumpkinStrings createMany
   */
  export type PumpkinStringsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PumpkinStrings.
     */
    data: PumpkinStringsCreateManyInput | PumpkinStringsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PumpkinStrings createManyAndReturn
   */
  export type PumpkinStringsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStrings
     */
    select?: PumpkinStringsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStrings
     */
    omit?: PumpkinStringsOmit<ExtArgs> | null
    /**
     * The data used to create many PumpkinStrings.
     */
    data: PumpkinStringsCreateManyInput | PumpkinStringsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PumpkinStrings update
   */
  export type PumpkinStringsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStrings
     */
    select?: PumpkinStringsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStrings
     */
    omit?: PumpkinStringsOmit<ExtArgs> | null
    /**
     * The data needed to update a PumpkinStrings.
     */
    data: XOR<PumpkinStringsUpdateInput, PumpkinStringsUncheckedUpdateInput>
    /**
     * Choose, which PumpkinStrings to update.
     */
    where: PumpkinStringsWhereUniqueInput
  }

  /**
   * PumpkinStrings updateMany
   */
  export type PumpkinStringsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PumpkinStrings.
     */
    data: XOR<PumpkinStringsUpdateManyMutationInput, PumpkinStringsUncheckedUpdateManyInput>
    /**
     * Filter which PumpkinStrings to update
     */
    where?: PumpkinStringsWhereInput
    /**
     * Limit how many PumpkinStrings to update.
     */
    limit?: number
  }

  /**
   * PumpkinStrings updateManyAndReturn
   */
  export type PumpkinStringsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStrings
     */
    select?: PumpkinStringsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStrings
     */
    omit?: PumpkinStringsOmit<ExtArgs> | null
    /**
     * The data used to update PumpkinStrings.
     */
    data: XOR<PumpkinStringsUpdateManyMutationInput, PumpkinStringsUncheckedUpdateManyInput>
    /**
     * Filter which PumpkinStrings to update
     */
    where?: PumpkinStringsWhereInput
    /**
     * Limit how many PumpkinStrings to update.
     */
    limit?: number
  }

  /**
   * PumpkinStrings upsert
   */
  export type PumpkinStringsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStrings
     */
    select?: PumpkinStringsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStrings
     */
    omit?: PumpkinStringsOmit<ExtArgs> | null
    /**
     * The filter to search for the PumpkinStrings to update in case it exists.
     */
    where: PumpkinStringsWhereUniqueInput
    /**
     * In case the PumpkinStrings found by the `where` argument doesn't exist, create a new PumpkinStrings with this data.
     */
    create: XOR<PumpkinStringsCreateInput, PumpkinStringsUncheckedCreateInput>
    /**
     * In case the PumpkinStrings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PumpkinStringsUpdateInput, PumpkinStringsUncheckedUpdateInput>
  }

  /**
   * PumpkinStrings delete
   */
  export type PumpkinStringsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStrings
     */
    select?: PumpkinStringsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStrings
     */
    omit?: PumpkinStringsOmit<ExtArgs> | null
    /**
     * Filter which PumpkinStrings to delete.
     */
    where: PumpkinStringsWhereUniqueInput
  }

  /**
   * PumpkinStrings deleteMany
   */
  export type PumpkinStringsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PumpkinStrings to delete
     */
    where?: PumpkinStringsWhereInput
    /**
     * Limit how many PumpkinStrings to delete.
     */
    limit?: number
  }

  /**
   * PumpkinStrings without action
   */
  export type PumpkinStringsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PumpkinStrings
     */
    select?: PumpkinStringsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PumpkinStrings
     */
    omit?: PumpkinStringsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tgUserId: 'tgUserId',
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PokerPlayerScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    cards: 'cards',
    balance: 'balance',
    betAmount: 'betAmount',
    hasFolded: 'hasFolded',
    hasLost: 'hasLost',
    hasTurned: 'hasTurned',
    userId: 'userId',
    stateId: 'stateId'
  };

  export type PokerPlayerScalarFieldEnum = (typeof PokerPlayerScalarFieldEnum)[keyof typeof PokerPlayerScalarFieldEnum]


  export const PokerStateScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tgChatId: 'tgChatId',
    cards: 'cards',
    round: 'round',
    dealsCount: 'dealsCount',
    dealerIndex: 'dealerIndex',
    currentPlayerIndex: 'currentPlayerIndex'
  };

  export type PokerStateScalarFieldEnum = (typeof PokerStateScalarFieldEnum)[keyof typeof PokerStateScalarFieldEnum]


  export const PumpkinPlayerScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tgChatId: 'tgChatId',
    userId: 'userId'
  };

  export type PumpkinPlayerScalarFieldEnum = (typeof PumpkinPlayerScalarFieldEnum)[keyof typeof PumpkinPlayerScalarFieldEnum]


  export const PumpkinStatsScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    date: 'date',
    playerId: 'playerId'
  };

  export type PumpkinStatsScalarFieldEnum = (typeof PumpkinStatsScalarFieldEnum)[keyof typeof PumpkinStatsScalarFieldEnum]


  export const PumpkinStringsScalarFieldEnum: {
    id: 'id',
    tgChatIds: 'tgChatIds',
    hello: 'hello',
    notEnoughPlayers: 'notEnoughPlayers',
    earlyWinner: 'earlyWinner',
    newWinner1: 'newWinner1',
    newWinner2: 'newWinner2',
    newWinner3: 'newWinner3',
    newWinner4: 'newWinner4',
    newWinnerNewYear: 'newWinnerNewYear',
    pumpkinOfYear: 'pumpkinOfYear',
    replyForWinner: 'replyForWinner',
    statsTitleAllTime: 'statsTitleAllTime',
    statsTitleYear: 'statsTitleYear',
    statsPlayer: 'statsPlayer',
    statsTotalPlayers: 'statsTotalPlayers'
  };

  export type PumpkinStringsScalarFieldEnum = (typeof PumpkinStringsScalarFieldEnum)[keyof typeof PumpkinStringsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'POKER_ROUND'
   */
  export type EnumPOKER_ROUNDFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'POKER_ROUND'>
    


  /**
   * Reference to a field of type 'POKER_ROUND[]'
   */
  export type ListEnumPOKER_ROUNDFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'POKER_ROUND[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tgUserId?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    username?: StringNullableFilter<"User"> | string | null
    pokerPlayer?: XOR<PokerPlayerNullableScalarRelationFilter, PokerPlayerWhereInput> | null
    pumpkinPlayer?: PumpkinPlayerListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgUserId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    pokerPlayer?: PokerPlayerOrderByWithRelationInput
    pumpkinPlayer?: PumpkinPlayerOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tgUserId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    username?: StringNullableFilter<"User"> | string | null
    pokerPlayer?: XOR<PokerPlayerNullableScalarRelationFilter, PokerPlayerWhereInput> | null
    pumpkinPlayer?: PumpkinPlayerListRelationFilter
  }, "id" | "tgUserId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgUserId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    tgUserId?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type PokerPlayerWhereInput = {
    AND?: PokerPlayerWhereInput | PokerPlayerWhereInput[]
    OR?: PokerPlayerWhereInput[]
    NOT?: PokerPlayerWhereInput | PokerPlayerWhereInput[]
    id?: StringFilter<"PokerPlayer"> | string
    createdAt?: DateTimeFilter<"PokerPlayer"> | Date | string
    updatedAt?: DateTimeFilter<"PokerPlayer"> | Date | string
    cards?: IntNullableListFilter<"PokerPlayer">
    balance?: IntFilter<"PokerPlayer"> | number
    betAmount?: IntFilter<"PokerPlayer"> | number
    hasFolded?: BoolFilter<"PokerPlayer"> | boolean
    hasLost?: BoolFilter<"PokerPlayer"> | boolean
    hasTurned?: BoolFilter<"PokerPlayer"> | boolean
    userId?: StringFilter<"PokerPlayer"> | string
    stateId?: StringFilter<"PokerPlayer"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    state?: XOR<PokerStateScalarRelationFilter, PokerStateWhereInput>
  }

  export type PokerPlayerOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cards?: SortOrder
    balance?: SortOrder
    betAmount?: SortOrder
    hasFolded?: SortOrder
    hasLost?: SortOrder
    hasTurned?: SortOrder
    userId?: SortOrder
    stateId?: SortOrder
    user?: UserOrderByWithRelationInput
    state?: PokerStateOrderByWithRelationInput
  }

  export type PokerPlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: PokerPlayerWhereInput | PokerPlayerWhereInput[]
    OR?: PokerPlayerWhereInput[]
    NOT?: PokerPlayerWhereInput | PokerPlayerWhereInput[]
    createdAt?: DateTimeFilter<"PokerPlayer"> | Date | string
    updatedAt?: DateTimeFilter<"PokerPlayer"> | Date | string
    cards?: IntNullableListFilter<"PokerPlayer">
    balance?: IntFilter<"PokerPlayer"> | number
    betAmount?: IntFilter<"PokerPlayer"> | number
    hasFolded?: BoolFilter<"PokerPlayer"> | boolean
    hasLost?: BoolFilter<"PokerPlayer"> | boolean
    hasTurned?: BoolFilter<"PokerPlayer"> | boolean
    stateId?: StringFilter<"PokerPlayer"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    state?: XOR<PokerStateScalarRelationFilter, PokerStateWhereInput>
  }, "id" | "userId">

  export type PokerPlayerOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cards?: SortOrder
    balance?: SortOrder
    betAmount?: SortOrder
    hasFolded?: SortOrder
    hasLost?: SortOrder
    hasTurned?: SortOrder
    userId?: SortOrder
    stateId?: SortOrder
    _count?: PokerPlayerCountOrderByAggregateInput
    _avg?: PokerPlayerAvgOrderByAggregateInput
    _max?: PokerPlayerMaxOrderByAggregateInput
    _min?: PokerPlayerMinOrderByAggregateInput
    _sum?: PokerPlayerSumOrderByAggregateInput
  }

  export type PokerPlayerScalarWhereWithAggregatesInput = {
    AND?: PokerPlayerScalarWhereWithAggregatesInput | PokerPlayerScalarWhereWithAggregatesInput[]
    OR?: PokerPlayerScalarWhereWithAggregatesInput[]
    NOT?: PokerPlayerScalarWhereWithAggregatesInput | PokerPlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PokerPlayer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PokerPlayer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PokerPlayer"> | Date | string
    cards?: IntNullableListFilter<"PokerPlayer">
    balance?: IntWithAggregatesFilter<"PokerPlayer"> | number
    betAmount?: IntWithAggregatesFilter<"PokerPlayer"> | number
    hasFolded?: BoolWithAggregatesFilter<"PokerPlayer"> | boolean
    hasLost?: BoolWithAggregatesFilter<"PokerPlayer"> | boolean
    hasTurned?: BoolWithAggregatesFilter<"PokerPlayer"> | boolean
    userId?: StringWithAggregatesFilter<"PokerPlayer"> | string
    stateId?: StringWithAggregatesFilter<"PokerPlayer"> | string
  }

  export type PokerStateWhereInput = {
    AND?: PokerStateWhereInput | PokerStateWhereInput[]
    OR?: PokerStateWhereInput[]
    NOT?: PokerStateWhereInput | PokerStateWhereInput[]
    id?: StringFilter<"PokerState"> | string
    createdAt?: DateTimeFilter<"PokerState"> | Date | string
    updatedAt?: DateTimeFilter<"PokerState"> | Date | string
    tgChatId?: StringFilter<"PokerState"> | string
    cards?: IntNullableListFilter<"PokerState">
    round?: EnumPOKER_ROUNDFilter<"PokerState"> | $Enums.POKER_ROUND
    dealsCount?: IntFilter<"PokerState"> | number
    dealerIndex?: IntFilter<"PokerState"> | number
    currentPlayerIndex?: IntFilter<"PokerState"> | number
    players?: PokerPlayerListRelationFilter
  }

  export type PokerStateOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgChatId?: SortOrder
    cards?: SortOrder
    round?: SortOrder
    dealsCount?: SortOrder
    dealerIndex?: SortOrder
    currentPlayerIndex?: SortOrder
    players?: PokerPlayerOrderByRelationAggregateInput
  }

  export type PokerStateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tgChatId?: string
    AND?: PokerStateWhereInput | PokerStateWhereInput[]
    OR?: PokerStateWhereInput[]
    NOT?: PokerStateWhereInput | PokerStateWhereInput[]
    createdAt?: DateTimeFilter<"PokerState"> | Date | string
    updatedAt?: DateTimeFilter<"PokerState"> | Date | string
    cards?: IntNullableListFilter<"PokerState">
    round?: EnumPOKER_ROUNDFilter<"PokerState"> | $Enums.POKER_ROUND
    dealsCount?: IntFilter<"PokerState"> | number
    dealerIndex?: IntFilter<"PokerState"> | number
    currentPlayerIndex?: IntFilter<"PokerState"> | number
    players?: PokerPlayerListRelationFilter
  }, "id" | "tgChatId">

  export type PokerStateOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgChatId?: SortOrder
    cards?: SortOrder
    round?: SortOrder
    dealsCount?: SortOrder
    dealerIndex?: SortOrder
    currentPlayerIndex?: SortOrder
    _count?: PokerStateCountOrderByAggregateInput
    _avg?: PokerStateAvgOrderByAggregateInput
    _max?: PokerStateMaxOrderByAggregateInput
    _min?: PokerStateMinOrderByAggregateInput
    _sum?: PokerStateSumOrderByAggregateInput
  }

  export type PokerStateScalarWhereWithAggregatesInput = {
    AND?: PokerStateScalarWhereWithAggregatesInput | PokerStateScalarWhereWithAggregatesInput[]
    OR?: PokerStateScalarWhereWithAggregatesInput[]
    NOT?: PokerStateScalarWhereWithAggregatesInput | PokerStateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PokerState"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PokerState"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PokerState"> | Date | string
    tgChatId?: StringWithAggregatesFilter<"PokerState"> | string
    cards?: IntNullableListFilter<"PokerState">
    round?: EnumPOKER_ROUNDWithAggregatesFilter<"PokerState"> | $Enums.POKER_ROUND
    dealsCount?: IntWithAggregatesFilter<"PokerState"> | number
    dealerIndex?: IntWithAggregatesFilter<"PokerState"> | number
    currentPlayerIndex?: IntWithAggregatesFilter<"PokerState"> | number
  }

  export type PumpkinPlayerWhereInput = {
    AND?: PumpkinPlayerWhereInput | PumpkinPlayerWhereInput[]
    OR?: PumpkinPlayerWhereInput[]
    NOT?: PumpkinPlayerWhereInput | PumpkinPlayerWhereInput[]
    id?: StringFilter<"PumpkinPlayer"> | string
    createdAt?: DateTimeFilter<"PumpkinPlayer"> | Date | string
    updatedAt?: DateTimeFilter<"PumpkinPlayer"> | Date | string
    tgChatId?: StringFilter<"PumpkinPlayer"> | string
    userId?: StringFilter<"PumpkinPlayer"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    stats?: PumpkinStatsListRelationFilter
  }

  export type PumpkinPlayerOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgChatId?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    stats?: PumpkinStatsOrderByRelationAggregateInput
  }

  export type PumpkinPlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tgChatId_userId?: PumpkinPlayerTgChatIdUserIdCompoundUniqueInput
    AND?: PumpkinPlayerWhereInput | PumpkinPlayerWhereInput[]
    OR?: PumpkinPlayerWhereInput[]
    NOT?: PumpkinPlayerWhereInput | PumpkinPlayerWhereInput[]
    createdAt?: DateTimeFilter<"PumpkinPlayer"> | Date | string
    updatedAt?: DateTimeFilter<"PumpkinPlayer"> | Date | string
    tgChatId?: StringFilter<"PumpkinPlayer"> | string
    userId?: StringFilter<"PumpkinPlayer"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    stats?: PumpkinStatsListRelationFilter
  }, "id" | "tgChatId_userId">

  export type PumpkinPlayerOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgChatId?: SortOrder
    userId?: SortOrder
    _count?: PumpkinPlayerCountOrderByAggregateInput
    _max?: PumpkinPlayerMaxOrderByAggregateInput
    _min?: PumpkinPlayerMinOrderByAggregateInput
  }

  export type PumpkinPlayerScalarWhereWithAggregatesInput = {
    AND?: PumpkinPlayerScalarWhereWithAggregatesInput | PumpkinPlayerScalarWhereWithAggregatesInput[]
    OR?: PumpkinPlayerScalarWhereWithAggregatesInput[]
    NOT?: PumpkinPlayerScalarWhereWithAggregatesInput | PumpkinPlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PumpkinPlayer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PumpkinPlayer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PumpkinPlayer"> | Date | string
    tgChatId?: StringWithAggregatesFilter<"PumpkinPlayer"> | string
    userId?: StringWithAggregatesFilter<"PumpkinPlayer"> | string
  }

  export type PumpkinStatsWhereInput = {
    AND?: PumpkinStatsWhereInput | PumpkinStatsWhereInput[]
    OR?: PumpkinStatsWhereInput[]
    NOT?: PumpkinStatsWhereInput | PumpkinStatsWhereInput[]
    id?: StringFilter<"PumpkinStats"> | string
    createdAt?: DateTimeFilter<"PumpkinStats"> | Date | string
    updatedAt?: DateTimeFilter<"PumpkinStats"> | Date | string
    date?: DateTimeFilter<"PumpkinStats"> | Date | string
    playerId?: StringFilter<"PumpkinStats"> | string
    player?: XOR<PumpkinPlayerScalarRelationFilter, PumpkinPlayerWhereInput>
  }

  export type PumpkinStatsOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    date?: SortOrder
    playerId?: SortOrder
    player?: PumpkinPlayerOrderByWithRelationInput
  }

  export type PumpkinStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    playerId_date?: PumpkinStatsPlayerIdDateCompoundUniqueInput
    AND?: PumpkinStatsWhereInput | PumpkinStatsWhereInput[]
    OR?: PumpkinStatsWhereInput[]
    NOT?: PumpkinStatsWhereInput | PumpkinStatsWhereInput[]
    createdAt?: DateTimeFilter<"PumpkinStats"> | Date | string
    updatedAt?: DateTimeFilter<"PumpkinStats"> | Date | string
    date?: DateTimeFilter<"PumpkinStats"> | Date | string
    playerId?: StringFilter<"PumpkinStats"> | string
    player?: XOR<PumpkinPlayerScalarRelationFilter, PumpkinPlayerWhereInput>
  }, "id" | "playerId_date">

  export type PumpkinStatsOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    date?: SortOrder
    playerId?: SortOrder
    _count?: PumpkinStatsCountOrderByAggregateInput
    _max?: PumpkinStatsMaxOrderByAggregateInput
    _min?: PumpkinStatsMinOrderByAggregateInput
  }

  export type PumpkinStatsScalarWhereWithAggregatesInput = {
    AND?: PumpkinStatsScalarWhereWithAggregatesInput | PumpkinStatsScalarWhereWithAggregatesInput[]
    OR?: PumpkinStatsScalarWhereWithAggregatesInput[]
    NOT?: PumpkinStatsScalarWhereWithAggregatesInput | PumpkinStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PumpkinStats"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PumpkinStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PumpkinStats"> | Date | string
    date?: DateTimeWithAggregatesFilter<"PumpkinStats"> | Date | string
    playerId?: StringWithAggregatesFilter<"PumpkinStats"> | string
  }

  export type PumpkinStringsWhereInput = {
    AND?: PumpkinStringsWhereInput | PumpkinStringsWhereInput[]
    OR?: PumpkinStringsWhereInput[]
    NOT?: PumpkinStringsWhereInput | PumpkinStringsWhereInput[]
    id?: StringFilter<"PumpkinStrings"> | string
    tgChatIds?: StringNullableListFilter<"PumpkinStrings">
    hello?: StringNullableListFilter<"PumpkinStrings">
    notEnoughPlayers?: StringNullableListFilter<"PumpkinStrings">
    earlyWinner?: StringNullableListFilter<"PumpkinStrings">
    newWinner1?: StringNullableListFilter<"PumpkinStrings">
    newWinner2?: StringNullableListFilter<"PumpkinStrings">
    newWinner3?: StringNullableListFilter<"PumpkinStrings">
    newWinner4?: StringNullableListFilter<"PumpkinStrings">
    newWinnerNewYear?: StringNullableListFilter<"PumpkinStrings">
    pumpkinOfYear?: StringNullableListFilter<"PumpkinStrings">
    replyForWinner?: StringNullableListFilter<"PumpkinStrings">
    statsTitleAllTime?: StringNullableListFilter<"PumpkinStrings">
    statsTitleYear?: StringNullableListFilter<"PumpkinStrings">
    statsPlayer?: StringNullableListFilter<"PumpkinStrings">
    statsTotalPlayers?: StringNullableListFilter<"PumpkinStrings">
  }

  export type PumpkinStringsOrderByWithRelationInput = {
    id?: SortOrder
    tgChatIds?: SortOrder
    hello?: SortOrder
    notEnoughPlayers?: SortOrder
    earlyWinner?: SortOrder
    newWinner1?: SortOrder
    newWinner2?: SortOrder
    newWinner3?: SortOrder
    newWinner4?: SortOrder
    newWinnerNewYear?: SortOrder
    pumpkinOfYear?: SortOrder
    replyForWinner?: SortOrder
    statsTitleAllTime?: SortOrder
    statsTitleYear?: SortOrder
    statsPlayer?: SortOrder
    statsTotalPlayers?: SortOrder
  }

  export type PumpkinStringsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PumpkinStringsWhereInput | PumpkinStringsWhereInput[]
    OR?: PumpkinStringsWhereInput[]
    NOT?: PumpkinStringsWhereInput | PumpkinStringsWhereInput[]
    tgChatIds?: StringNullableListFilter<"PumpkinStrings">
    hello?: StringNullableListFilter<"PumpkinStrings">
    notEnoughPlayers?: StringNullableListFilter<"PumpkinStrings">
    earlyWinner?: StringNullableListFilter<"PumpkinStrings">
    newWinner1?: StringNullableListFilter<"PumpkinStrings">
    newWinner2?: StringNullableListFilter<"PumpkinStrings">
    newWinner3?: StringNullableListFilter<"PumpkinStrings">
    newWinner4?: StringNullableListFilter<"PumpkinStrings">
    newWinnerNewYear?: StringNullableListFilter<"PumpkinStrings">
    pumpkinOfYear?: StringNullableListFilter<"PumpkinStrings">
    replyForWinner?: StringNullableListFilter<"PumpkinStrings">
    statsTitleAllTime?: StringNullableListFilter<"PumpkinStrings">
    statsTitleYear?: StringNullableListFilter<"PumpkinStrings">
    statsPlayer?: StringNullableListFilter<"PumpkinStrings">
    statsTotalPlayers?: StringNullableListFilter<"PumpkinStrings">
  }, "id">

  export type PumpkinStringsOrderByWithAggregationInput = {
    id?: SortOrder
    tgChatIds?: SortOrder
    hello?: SortOrder
    notEnoughPlayers?: SortOrder
    earlyWinner?: SortOrder
    newWinner1?: SortOrder
    newWinner2?: SortOrder
    newWinner3?: SortOrder
    newWinner4?: SortOrder
    newWinnerNewYear?: SortOrder
    pumpkinOfYear?: SortOrder
    replyForWinner?: SortOrder
    statsTitleAllTime?: SortOrder
    statsTitleYear?: SortOrder
    statsPlayer?: SortOrder
    statsTotalPlayers?: SortOrder
    _count?: PumpkinStringsCountOrderByAggregateInput
    _max?: PumpkinStringsMaxOrderByAggregateInput
    _min?: PumpkinStringsMinOrderByAggregateInput
  }

  export type PumpkinStringsScalarWhereWithAggregatesInput = {
    AND?: PumpkinStringsScalarWhereWithAggregatesInput | PumpkinStringsScalarWhereWithAggregatesInput[]
    OR?: PumpkinStringsScalarWhereWithAggregatesInput[]
    NOT?: PumpkinStringsScalarWhereWithAggregatesInput | PumpkinStringsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PumpkinStrings"> | string
    tgChatIds?: StringNullableListFilter<"PumpkinStrings">
    hello?: StringNullableListFilter<"PumpkinStrings">
    notEnoughPlayers?: StringNullableListFilter<"PumpkinStrings">
    earlyWinner?: StringNullableListFilter<"PumpkinStrings">
    newWinner1?: StringNullableListFilter<"PumpkinStrings">
    newWinner2?: StringNullableListFilter<"PumpkinStrings">
    newWinner3?: StringNullableListFilter<"PumpkinStrings">
    newWinner4?: StringNullableListFilter<"PumpkinStrings">
    newWinnerNewYear?: StringNullableListFilter<"PumpkinStrings">
    pumpkinOfYear?: StringNullableListFilter<"PumpkinStrings">
    replyForWinner?: StringNullableListFilter<"PumpkinStrings">
    statsTitleAllTime?: StringNullableListFilter<"PumpkinStrings">
    statsTitleYear?: StringNullableListFilter<"PumpkinStrings">
    statsPlayer?: StringNullableListFilter<"PumpkinStrings">
    statsTotalPlayers?: StringNullableListFilter<"PumpkinStrings">
  }

  export type UserCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgUserId: string
    firstName: string
    lastName?: string | null
    username?: string | null
    pokerPlayer?: PokerPlayerCreateNestedOneWithoutUserInput
    pumpkinPlayer?: PumpkinPlayerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgUserId: string
    firstName: string
    lastName?: string | null
    username?: string | null
    pokerPlayer?: PokerPlayerUncheckedCreateNestedOneWithoutUserInput
    pumpkinPlayer?: PumpkinPlayerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    pokerPlayer?: PokerPlayerUpdateOneWithoutUserNestedInput
    pumpkinPlayer?: PumpkinPlayerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    pokerPlayer?: PokerPlayerUncheckedUpdateOneWithoutUserNestedInput
    pumpkinPlayer?: PumpkinPlayerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgUserId: string
    firstName: string
    lastName?: string | null
    username?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PokerPlayerCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: PokerPlayerCreatecardsInput | number[]
    balance: number
    betAmount: number
    hasFolded: boolean
    hasLost: boolean
    hasTurned: boolean
    user: UserCreateNestedOneWithoutPokerPlayerInput
    state: PokerStateCreateNestedOneWithoutPlayersInput
  }

  export type PokerPlayerUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: PokerPlayerCreatecardsInput | number[]
    balance: number
    betAmount: number
    hasFolded: boolean
    hasLost: boolean
    hasTurned: boolean
    userId: string
    stateId: string
  }

  export type PokerPlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: PokerPlayerUpdatecardsInput | number[]
    balance?: IntFieldUpdateOperationsInput | number
    betAmount?: IntFieldUpdateOperationsInput | number
    hasFolded?: BoolFieldUpdateOperationsInput | boolean
    hasLost?: BoolFieldUpdateOperationsInput | boolean
    hasTurned?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutPokerPlayerNestedInput
    state?: PokerStateUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type PokerPlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: PokerPlayerUpdatecardsInput | number[]
    balance?: IntFieldUpdateOperationsInput | number
    betAmount?: IntFieldUpdateOperationsInput | number
    hasFolded?: BoolFieldUpdateOperationsInput | boolean
    hasLost?: BoolFieldUpdateOperationsInput | boolean
    hasTurned?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
  }

  export type PokerPlayerCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: PokerPlayerCreatecardsInput | number[]
    balance: number
    betAmount: number
    hasFolded: boolean
    hasLost: boolean
    hasTurned: boolean
    userId: string
    stateId: string
  }

  export type PokerPlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: PokerPlayerUpdatecardsInput | number[]
    balance?: IntFieldUpdateOperationsInput | number
    betAmount?: IntFieldUpdateOperationsInput | number
    hasFolded?: BoolFieldUpdateOperationsInput | boolean
    hasLost?: BoolFieldUpdateOperationsInput | boolean
    hasTurned?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PokerPlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: PokerPlayerUpdatecardsInput | number[]
    balance?: IntFieldUpdateOperationsInput | number
    betAmount?: IntFieldUpdateOperationsInput | number
    hasFolded?: BoolFieldUpdateOperationsInput | boolean
    hasLost?: BoolFieldUpdateOperationsInput | boolean
    hasTurned?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
  }

  export type PokerStateCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgChatId: string
    cards?: PokerStateCreatecardsInput | number[]
    round: $Enums.POKER_ROUND
    dealsCount: number
    dealerIndex: number
    currentPlayerIndex: number
    players?: PokerPlayerCreateNestedManyWithoutStateInput
  }

  export type PokerStateUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgChatId: string
    cards?: PokerStateCreatecardsInput | number[]
    round: $Enums.POKER_ROUND
    dealsCount: number
    dealerIndex: number
    currentPlayerIndex: number
    players?: PokerPlayerUncheckedCreateNestedManyWithoutStateInput
  }

  export type PokerStateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
    cards?: PokerStateUpdatecardsInput | number[]
    round?: EnumPOKER_ROUNDFieldUpdateOperationsInput | $Enums.POKER_ROUND
    dealsCount?: IntFieldUpdateOperationsInput | number
    dealerIndex?: IntFieldUpdateOperationsInput | number
    currentPlayerIndex?: IntFieldUpdateOperationsInput | number
    players?: PokerPlayerUpdateManyWithoutStateNestedInput
  }

  export type PokerStateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
    cards?: PokerStateUpdatecardsInput | number[]
    round?: EnumPOKER_ROUNDFieldUpdateOperationsInput | $Enums.POKER_ROUND
    dealsCount?: IntFieldUpdateOperationsInput | number
    dealerIndex?: IntFieldUpdateOperationsInput | number
    currentPlayerIndex?: IntFieldUpdateOperationsInput | number
    players?: PokerPlayerUncheckedUpdateManyWithoutStateNestedInput
  }

  export type PokerStateCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgChatId: string
    cards?: PokerStateCreatecardsInput | number[]
    round: $Enums.POKER_ROUND
    dealsCount: number
    dealerIndex: number
    currentPlayerIndex: number
  }

  export type PokerStateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
    cards?: PokerStateUpdatecardsInput | number[]
    round?: EnumPOKER_ROUNDFieldUpdateOperationsInput | $Enums.POKER_ROUND
    dealsCount?: IntFieldUpdateOperationsInput | number
    dealerIndex?: IntFieldUpdateOperationsInput | number
    currentPlayerIndex?: IntFieldUpdateOperationsInput | number
  }

  export type PokerStateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
    cards?: PokerStateUpdatecardsInput | number[]
    round?: EnumPOKER_ROUNDFieldUpdateOperationsInput | $Enums.POKER_ROUND
    dealsCount?: IntFieldUpdateOperationsInput | number
    dealerIndex?: IntFieldUpdateOperationsInput | number
    currentPlayerIndex?: IntFieldUpdateOperationsInput | number
  }

  export type PumpkinPlayerCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgChatId: string
    user: UserCreateNestedOneWithoutPumpkinPlayerInput
    stats?: PumpkinStatsCreateNestedManyWithoutPlayerInput
  }

  export type PumpkinPlayerUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgChatId: string
    userId: string
    stats?: PumpkinStatsUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PumpkinPlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPumpkinPlayerNestedInput
    stats?: PumpkinStatsUpdateManyWithoutPlayerNestedInput
  }

  export type PumpkinPlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stats?: PumpkinStatsUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type PumpkinPlayerCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgChatId: string
    userId: string
  }

  export type PumpkinPlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
  }

  export type PumpkinPlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PumpkinStatsCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    player: PumpkinPlayerCreateNestedOneWithoutStatsInput
  }

  export type PumpkinStatsUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    playerId: string
  }

  export type PumpkinStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    player?: PumpkinPlayerUpdateOneRequiredWithoutStatsNestedInput
  }

  export type PumpkinStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    playerId?: StringFieldUpdateOperationsInput | string
  }

  export type PumpkinStatsCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    playerId: string
  }

  export type PumpkinStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PumpkinStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    playerId?: StringFieldUpdateOperationsInput | string
  }

  export type PumpkinStringsCreateInput = {
    id?: string
    tgChatIds?: PumpkinStringsCreatetgChatIdsInput | string[]
    hello?: PumpkinStringsCreatehelloInput | string[]
    notEnoughPlayers?: PumpkinStringsCreatenotEnoughPlayersInput | string[]
    earlyWinner?: PumpkinStringsCreateearlyWinnerInput | string[]
    newWinner1?: PumpkinStringsCreatenewWinner1Input | string[]
    newWinner2?: PumpkinStringsCreatenewWinner2Input | string[]
    newWinner3?: PumpkinStringsCreatenewWinner3Input | string[]
    newWinner4?: PumpkinStringsCreatenewWinner4Input | string[]
    newWinnerNewYear?: PumpkinStringsCreatenewWinnerNewYearInput | string[]
    pumpkinOfYear?: PumpkinStringsCreatepumpkinOfYearInput | string[]
    replyForWinner?: PumpkinStringsCreatereplyForWinnerInput | string[]
    statsTitleAllTime?: PumpkinStringsCreatestatsTitleAllTimeInput | string[]
    statsTitleYear?: PumpkinStringsCreatestatsTitleYearInput | string[]
    statsPlayer?: PumpkinStringsCreatestatsPlayerInput | string[]
    statsTotalPlayers?: PumpkinStringsCreatestatsTotalPlayersInput | string[]
  }

  export type PumpkinStringsUncheckedCreateInput = {
    id?: string
    tgChatIds?: PumpkinStringsCreatetgChatIdsInput | string[]
    hello?: PumpkinStringsCreatehelloInput | string[]
    notEnoughPlayers?: PumpkinStringsCreatenotEnoughPlayersInput | string[]
    earlyWinner?: PumpkinStringsCreateearlyWinnerInput | string[]
    newWinner1?: PumpkinStringsCreatenewWinner1Input | string[]
    newWinner2?: PumpkinStringsCreatenewWinner2Input | string[]
    newWinner3?: PumpkinStringsCreatenewWinner3Input | string[]
    newWinner4?: PumpkinStringsCreatenewWinner4Input | string[]
    newWinnerNewYear?: PumpkinStringsCreatenewWinnerNewYearInput | string[]
    pumpkinOfYear?: PumpkinStringsCreatepumpkinOfYearInput | string[]
    replyForWinner?: PumpkinStringsCreatereplyForWinnerInput | string[]
    statsTitleAllTime?: PumpkinStringsCreatestatsTitleAllTimeInput | string[]
    statsTitleYear?: PumpkinStringsCreatestatsTitleYearInput | string[]
    statsPlayer?: PumpkinStringsCreatestatsPlayerInput | string[]
    statsTotalPlayers?: PumpkinStringsCreatestatsTotalPlayersInput | string[]
  }

  export type PumpkinStringsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgChatIds?: PumpkinStringsUpdatetgChatIdsInput | string[]
    hello?: PumpkinStringsUpdatehelloInput | string[]
    notEnoughPlayers?: PumpkinStringsUpdatenotEnoughPlayersInput | string[]
    earlyWinner?: PumpkinStringsUpdateearlyWinnerInput | string[]
    newWinner1?: PumpkinStringsUpdatenewWinner1Input | string[]
    newWinner2?: PumpkinStringsUpdatenewWinner2Input | string[]
    newWinner3?: PumpkinStringsUpdatenewWinner3Input | string[]
    newWinner4?: PumpkinStringsUpdatenewWinner4Input | string[]
    newWinnerNewYear?: PumpkinStringsUpdatenewWinnerNewYearInput | string[]
    pumpkinOfYear?: PumpkinStringsUpdatepumpkinOfYearInput | string[]
    replyForWinner?: PumpkinStringsUpdatereplyForWinnerInput | string[]
    statsTitleAllTime?: PumpkinStringsUpdatestatsTitleAllTimeInput | string[]
    statsTitleYear?: PumpkinStringsUpdatestatsTitleYearInput | string[]
    statsPlayer?: PumpkinStringsUpdatestatsPlayerInput | string[]
    statsTotalPlayers?: PumpkinStringsUpdatestatsTotalPlayersInput | string[]
  }

  export type PumpkinStringsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgChatIds?: PumpkinStringsUpdatetgChatIdsInput | string[]
    hello?: PumpkinStringsUpdatehelloInput | string[]
    notEnoughPlayers?: PumpkinStringsUpdatenotEnoughPlayersInput | string[]
    earlyWinner?: PumpkinStringsUpdateearlyWinnerInput | string[]
    newWinner1?: PumpkinStringsUpdatenewWinner1Input | string[]
    newWinner2?: PumpkinStringsUpdatenewWinner2Input | string[]
    newWinner3?: PumpkinStringsUpdatenewWinner3Input | string[]
    newWinner4?: PumpkinStringsUpdatenewWinner4Input | string[]
    newWinnerNewYear?: PumpkinStringsUpdatenewWinnerNewYearInput | string[]
    pumpkinOfYear?: PumpkinStringsUpdatepumpkinOfYearInput | string[]
    replyForWinner?: PumpkinStringsUpdatereplyForWinnerInput | string[]
    statsTitleAllTime?: PumpkinStringsUpdatestatsTitleAllTimeInput | string[]
    statsTitleYear?: PumpkinStringsUpdatestatsTitleYearInput | string[]
    statsPlayer?: PumpkinStringsUpdatestatsPlayerInput | string[]
    statsTotalPlayers?: PumpkinStringsUpdatestatsTotalPlayersInput | string[]
  }

  export type PumpkinStringsCreateManyInput = {
    id?: string
    tgChatIds?: PumpkinStringsCreatetgChatIdsInput | string[]
    hello?: PumpkinStringsCreatehelloInput | string[]
    notEnoughPlayers?: PumpkinStringsCreatenotEnoughPlayersInput | string[]
    earlyWinner?: PumpkinStringsCreateearlyWinnerInput | string[]
    newWinner1?: PumpkinStringsCreatenewWinner1Input | string[]
    newWinner2?: PumpkinStringsCreatenewWinner2Input | string[]
    newWinner3?: PumpkinStringsCreatenewWinner3Input | string[]
    newWinner4?: PumpkinStringsCreatenewWinner4Input | string[]
    newWinnerNewYear?: PumpkinStringsCreatenewWinnerNewYearInput | string[]
    pumpkinOfYear?: PumpkinStringsCreatepumpkinOfYearInput | string[]
    replyForWinner?: PumpkinStringsCreatereplyForWinnerInput | string[]
    statsTitleAllTime?: PumpkinStringsCreatestatsTitleAllTimeInput | string[]
    statsTitleYear?: PumpkinStringsCreatestatsTitleYearInput | string[]
    statsPlayer?: PumpkinStringsCreatestatsPlayerInput | string[]
    statsTotalPlayers?: PumpkinStringsCreatestatsTotalPlayersInput | string[]
  }

  export type PumpkinStringsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgChatIds?: PumpkinStringsUpdatetgChatIdsInput | string[]
    hello?: PumpkinStringsUpdatehelloInput | string[]
    notEnoughPlayers?: PumpkinStringsUpdatenotEnoughPlayersInput | string[]
    earlyWinner?: PumpkinStringsUpdateearlyWinnerInput | string[]
    newWinner1?: PumpkinStringsUpdatenewWinner1Input | string[]
    newWinner2?: PumpkinStringsUpdatenewWinner2Input | string[]
    newWinner3?: PumpkinStringsUpdatenewWinner3Input | string[]
    newWinner4?: PumpkinStringsUpdatenewWinner4Input | string[]
    newWinnerNewYear?: PumpkinStringsUpdatenewWinnerNewYearInput | string[]
    pumpkinOfYear?: PumpkinStringsUpdatepumpkinOfYearInput | string[]
    replyForWinner?: PumpkinStringsUpdatereplyForWinnerInput | string[]
    statsTitleAllTime?: PumpkinStringsUpdatestatsTitleAllTimeInput | string[]
    statsTitleYear?: PumpkinStringsUpdatestatsTitleYearInput | string[]
    statsPlayer?: PumpkinStringsUpdatestatsPlayerInput | string[]
    statsTotalPlayers?: PumpkinStringsUpdatestatsTotalPlayersInput | string[]
  }

  export type PumpkinStringsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tgChatIds?: PumpkinStringsUpdatetgChatIdsInput | string[]
    hello?: PumpkinStringsUpdatehelloInput | string[]
    notEnoughPlayers?: PumpkinStringsUpdatenotEnoughPlayersInput | string[]
    earlyWinner?: PumpkinStringsUpdateearlyWinnerInput | string[]
    newWinner1?: PumpkinStringsUpdatenewWinner1Input | string[]
    newWinner2?: PumpkinStringsUpdatenewWinner2Input | string[]
    newWinner3?: PumpkinStringsUpdatenewWinner3Input | string[]
    newWinner4?: PumpkinStringsUpdatenewWinner4Input | string[]
    newWinnerNewYear?: PumpkinStringsUpdatenewWinnerNewYearInput | string[]
    pumpkinOfYear?: PumpkinStringsUpdatepumpkinOfYearInput | string[]
    replyForWinner?: PumpkinStringsUpdatereplyForWinnerInput | string[]
    statsTitleAllTime?: PumpkinStringsUpdatestatsTitleAllTimeInput | string[]
    statsTitleYear?: PumpkinStringsUpdatestatsTitleYearInput | string[]
    statsPlayer?: PumpkinStringsUpdatestatsPlayerInput | string[]
    statsTotalPlayers?: PumpkinStringsUpdatestatsTotalPlayersInput | string[]
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type PokerPlayerNullableScalarRelationFilter = {
    is?: PokerPlayerWhereInput | null
    isNot?: PokerPlayerWhereInput | null
  }

  export type PumpkinPlayerListRelationFilter = {
    every?: PumpkinPlayerWhereInput
    some?: PumpkinPlayerWhereInput
    none?: PumpkinPlayerWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PumpkinPlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgUserId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgUserId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgUserId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PokerStateScalarRelationFilter = {
    is?: PokerStateWhereInput
    isNot?: PokerStateWhereInput
  }

  export type PokerPlayerCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cards?: SortOrder
    balance?: SortOrder
    betAmount?: SortOrder
    hasFolded?: SortOrder
    hasLost?: SortOrder
    hasTurned?: SortOrder
    userId?: SortOrder
    stateId?: SortOrder
  }

  export type PokerPlayerAvgOrderByAggregateInput = {
    cards?: SortOrder
    balance?: SortOrder
    betAmount?: SortOrder
  }

  export type PokerPlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    balance?: SortOrder
    betAmount?: SortOrder
    hasFolded?: SortOrder
    hasLost?: SortOrder
    hasTurned?: SortOrder
    userId?: SortOrder
    stateId?: SortOrder
  }

  export type PokerPlayerMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    balance?: SortOrder
    betAmount?: SortOrder
    hasFolded?: SortOrder
    hasLost?: SortOrder
    hasTurned?: SortOrder
    userId?: SortOrder
    stateId?: SortOrder
  }

  export type PokerPlayerSumOrderByAggregateInput = {
    cards?: SortOrder
    balance?: SortOrder
    betAmount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumPOKER_ROUNDFilter<$PrismaModel = never> = {
    equals?: $Enums.POKER_ROUND | EnumPOKER_ROUNDFieldRefInput<$PrismaModel>
    in?: $Enums.POKER_ROUND[] | ListEnumPOKER_ROUNDFieldRefInput<$PrismaModel>
    notIn?: $Enums.POKER_ROUND[] | ListEnumPOKER_ROUNDFieldRefInput<$PrismaModel>
    not?: NestedEnumPOKER_ROUNDFilter<$PrismaModel> | $Enums.POKER_ROUND
  }

  export type PokerPlayerListRelationFilter = {
    every?: PokerPlayerWhereInput
    some?: PokerPlayerWhereInput
    none?: PokerPlayerWhereInput
  }

  export type PokerPlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PokerStateCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgChatId?: SortOrder
    cards?: SortOrder
    round?: SortOrder
    dealsCount?: SortOrder
    dealerIndex?: SortOrder
    currentPlayerIndex?: SortOrder
  }

  export type PokerStateAvgOrderByAggregateInput = {
    cards?: SortOrder
    dealsCount?: SortOrder
    dealerIndex?: SortOrder
    currentPlayerIndex?: SortOrder
  }

  export type PokerStateMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgChatId?: SortOrder
    round?: SortOrder
    dealsCount?: SortOrder
    dealerIndex?: SortOrder
    currentPlayerIndex?: SortOrder
  }

  export type PokerStateMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgChatId?: SortOrder
    round?: SortOrder
    dealsCount?: SortOrder
    dealerIndex?: SortOrder
    currentPlayerIndex?: SortOrder
  }

  export type PokerStateSumOrderByAggregateInput = {
    cards?: SortOrder
    dealsCount?: SortOrder
    dealerIndex?: SortOrder
    currentPlayerIndex?: SortOrder
  }

  export type EnumPOKER_ROUNDWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.POKER_ROUND | EnumPOKER_ROUNDFieldRefInput<$PrismaModel>
    in?: $Enums.POKER_ROUND[] | ListEnumPOKER_ROUNDFieldRefInput<$PrismaModel>
    notIn?: $Enums.POKER_ROUND[] | ListEnumPOKER_ROUNDFieldRefInput<$PrismaModel>
    not?: NestedEnumPOKER_ROUNDWithAggregatesFilter<$PrismaModel> | $Enums.POKER_ROUND
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPOKER_ROUNDFilter<$PrismaModel>
    _max?: NestedEnumPOKER_ROUNDFilter<$PrismaModel>
  }

  export type PumpkinStatsListRelationFilter = {
    every?: PumpkinStatsWhereInput
    some?: PumpkinStatsWhereInput
    none?: PumpkinStatsWhereInput
  }

  export type PumpkinStatsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PumpkinPlayerTgChatIdUserIdCompoundUniqueInput = {
    tgChatId: string
    userId: string
  }

  export type PumpkinPlayerCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgChatId?: SortOrder
    userId?: SortOrder
  }

  export type PumpkinPlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgChatId?: SortOrder
    userId?: SortOrder
  }

  export type PumpkinPlayerMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tgChatId?: SortOrder
    userId?: SortOrder
  }

  export type PumpkinPlayerScalarRelationFilter = {
    is?: PumpkinPlayerWhereInput
    isNot?: PumpkinPlayerWhereInput
  }

  export type PumpkinStatsPlayerIdDateCompoundUniqueInput = {
    playerId: string
    date: Date | string
  }

  export type PumpkinStatsCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    date?: SortOrder
    playerId?: SortOrder
  }

  export type PumpkinStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    date?: SortOrder
    playerId?: SortOrder
  }

  export type PumpkinStatsMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    date?: SortOrder
    playerId?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type PumpkinStringsCountOrderByAggregateInput = {
    id?: SortOrder
    tgChatIds?: SortOrder
    hello?: SortOrder
    notEnoughPlayers?: SortOrder
    earlyWinner?: SortOrder
    newWinner1?: SortOrder
    newWinner2?: SortOrder
    newWinner3?: SortOrder
    newWinner4?: SortOrder
    newWinnerNewYear?: SortOrder
    pumpkinOfYear?: SortOrder
    replyForWinner?: SortOrder
    statsTitleAllTime?: SortOrder
    statsTitleYear?: SortOrder
    statsPlayer?: SortOrder
    statsTotalPlayers?: SortOrder
  }

  export type PumpkinStringsMaxOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PumpkinStringsMinOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PokerPlayerCreateNestedOneWithoutUserInput = {
    create?: XOR<PokerPlayerCreateWithoutUserInput, PokerPlayerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PokerPlayerCreateOrConnectWithoutUserInput
    connect?: PokerPlayerWhereUniqueInput
  }

  export type PumpkinPlayerCreateNestedManyWithoutUserInput = {
    create?: XOR<PumpkinPlayerCreateWithoutUserInput, PumpkinPlayerUncheckedCreateWithoutUserInput> | PumpkinPlayerCreateWithoutUserInput[] | PumpkinPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PumpkinPlayerCreateOrConnectWithoutUserInput | PumpkinPlayerCreateOrConnectWithoutUserInput[]
    createMany?: PumpkinPlayerCreateManyUserInputEnvelope
    connect?: PumpkinPlayerWhereUniqueInput | PumpkinPlayerWhereUniqueInput[]
  }

  export type PokerPlayerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PokerPlayerCreateWithoutUserInput, PokerPlayerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PokerPlayerCreateOrConnectWithoutUserInput
    connect?: PokerPlayerWhereUniqueInput
  }

  export type PumpkinPlayerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PumpkinPlayerCreateWithoutUserInput, PumpkinPlayerUncheckedCreateWithoutUserInput> | PumpkinPlayerCreateWithoutUserInput[] | PumpkinPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PumpkinPlayerCreateOrConnectWithoutUserInput | PumpkinPlayerCreateOrConnectWithoutUserInput[]
    createMany?: PumpkinPlayerCreateManyUserInputEnvelope
    connect?: PumpkinPlayerWhereUniqueInput | PumpkinPlayerWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type PokerPlayerUpdateOneWithoutUserNestedInput = {
    create?: XOR<PokerPlayerCreateWithoutUserInput, PokerPlayerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PokerPlayerCreateOrConnectWithoutUserInput
    upsert?: PokerPlayerUpsertWithoutUserInput
    disconnect?: PokerPlayerWhereInput | boolean
    delete?: PokerPlayerWhereInput | boolean
    connect?: PokerPlayerWhereUniqueInput
    update?: XOR<XOR<PokerPlayerUpdateToOneWithWhereWithoutUserInput, PokerPlayerUpdateWithoutUserInput>, PokerPlayerUncheckedUpdateWithoutUserInput>
  }

  export type PumpkinPlayerUpdateManyWithoutUserNestedInput = {
    create?: XOR<PumpkinPlayerCreateWithoutUserInput, PumpkinPlayerUncheckedCreateWithoutUserInput> | PumpkinPlayerCreateWithoutUserInput[] | PumpkinPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PumpkinPlayerCreateOrConnectWithoutUserInput | PumpkinPlayerCreateOrConnectWithoutUserInput[]
    upsert?: PumpkinPlayerUpsertWithWhereUniqueWithoutUserInput | PumpkinPlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PumpkinPlayerCreateManyUserInputEnvelope
    set?: PumpkinPlayerWhereUniqueInput | PumpkinPlayerWhereUniqueInput[]
    disconnect?: PumpkinPlayerWhereUniqueInput | PumpkinPlayerWhereUniqueInput[]
    delete?: PumpkinPlayerWhereUniqueInput | PumpkinPlayerWhereUniqueInput[]
    connect?: PumpkinPlayerWhereUniqueInput | PumpkinPlayerWhereUniqueInput[]
    update?: PumpkinPlayerUpdateWithWhereUniqueWithoutUserInput | PumpkinPlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PumpkinPlayerUpdateManyWithWhereWithoutUserInput | PumpkinPlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PumpkinPlayerScalarWhereInput | PumpkinPlayerScalarWhereInput[]
  }

  export type PokerPlayerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PokerPlayerCreateWithoutUserInput, PokerPlayerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PokerPlayerCreateOrConnectWithoutUserInput
    upsert?: PokerPlayerUpsertWithoutUserInput
    disconnect?: PokerPlayerWhereInput | boolean
    delete?: PokerPlayerWhereInput | boolean
    connect?: PokerPlayerWhereUniqueInput
    update?: XOR<XOR<PokerPlayerUpdateToOneWithWhereWithoutUserInput, PokerPlayerUpdateWithoutUserInput>, PokerPlayerUncheckedUpdateWithoutUserInput>
  }

  export type PumpkinPlayerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PumpkinPlayerCreateWithoutUserInput, PumpkinPlayerUncheckedCreateWithoutUserInput> | PumpkinPlayerCreateWithoutUserInput[] | PumpkinPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PumpkinPlayerCreateOrConnectWithoutUserInput | PumpkinPlayerCreateOrConnectWithoutUserInput[]
    upsert?: PumpkinPlayerUpsertWithWhereUniqueWithoutUserInput | PumpkinPlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PumpkinPlayerCreateManyUserInputEnvelope
    set?: PumpkinPlayerWhereUniqueInput | PumpkinPlayerWhereUniqueInput[]
    disconnect?: PumpkinPlayerWhereUniqueInput | PumpkinPlayerWhereUniqueInput[]
    delete?: PumpkinPlayerWhereUniqueInput | PumpkinPlayerWhereUniqueInput[]
    connect?: PumpkinPlayerWhereUniqueInput | PumpkinPlayerWhereUniqueInput[]
    update?: PumpkinPlayerUpdateWithWhereUniqueWithoutUserInput | PumpkinPlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PumpkinPlayerUpdateManyWithWhereWithoutUserInput | PumpkinPlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PumpkinPlayerScalarWhereInput | PumpkinPlayerScalarWhereInput[]
  }

  export type PokerPlayerCreatecardsInput = {
    set: number[]
  }

  export type UserCreateNestedOneWithoutPokerPlayerInput = {
    create?: XOR<UserCreateWithoutPokerPlayerInput, UserUncheckedCreateWithoutPokerPlayerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPokerPlayerInput
    connect?: UserWhereUniqueInput
  }

  export type PokerStateCreateNestedOneWithoutPlayersInput = {
    create?: XOR<PokerStateCreateWithoutPlayersInput, PokerStateUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: PokerStateCreateOrConnectWithoutPlayersInput
    connect?: PokerStateWhereUniqueInput
  }

  export type PokerPlayerUpdatecardsInput = {
    set?: number[]
    push?: number | number[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutPokerPlayerNestedInput = {
    create?: XOR<UserCreateWithoutPokerPlayerInput, UserUncheckedCreateWithoutPokerPlayerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPokerPlayerInput
    upsert?: UserUpsertWithoutPokerPlayerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPokerPlayerInput, UserUpdateWithoutPokerPlayerInput>, UserUncheckedUpdateWithoutPokerPlayerInput>
  }

  export type PokerStateUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<PokerStateCreateWithoutPlayersInput, PokerStateUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: PokerStateCreateOrConnectWithoutPlayersInput
    upsert?: PokerStateUpsertWithoutPlayersInput
    connect?: PokerStateWhereUniqueInput
    update?: XOR<XOR<PokerStateUpdateToOneWithWhereWithoutPlayersInput, PokerStateUpdateWithoutPlayersInput>, PokerStateUncheckedUpdateWithoutPlayersInput>
  }

  export type PokerStateCreatecardsInput = {
    set: number[]
  }

  export type PokerPlayerCreateNestedManyWithoutStateInput = {
    create?: XOR<PokerPlayerCreateWithoutStateInput, PokerPlayerUncheckedCreateWithoutStateInput> | PokerPlayerCreateWithoutStateInput[] | PokerPlayerUncheckedCreateWithoutStateInput[]
    connectOrCreate?: PokerPlayerCreateOrConnectWithoutStateInput | PokerPlayerCreateOrConnectWithoutStateInput[]
    createMany?: PokerPlayerCreateManyStateInputEnvelope
    connect?: PokerPlayerWhereUniqueInput | PokerPlayerWhereUniqueInput[]
  }

  export type PokerPlayerUncheckedCreateNestedManyWithoutStateInput = {
    create?: XOR<PokerPlayerCreateWithoutStateInput, PokerPlayerUncheckedCreateWithoutStateInput> | PokerPlayerCreateWithoutStateInput[] | PokerPlayerUncheckedCreateWithoutStateInput[]
    connectOrCreate?: PokerPlayerCreateOrConnectWithoutStateInput | PokerPlayerCreateOrConnectWithoutStateInput[]
    createMany?: PokerPlayerCreateManyStateInputEnvelope
    connect?: PokerPlayerWhereUniqueInput | PokerPlayerWhereUniqueInput[]
  }

  export type PokerStateUpdatecardsInput = {
    set?: number[]
    push?: number | number[]
  }

  export type EnumPOKER_ROUNDFieldUpdateOperationsInput = {
    set?: $Enums.POKER_ROUND
  }

  export type PokerPlayerUpdateManyWithoutStateNestedInput = {
    create?: XOR<PokerPlayerCreateWithoutStateInput, PokerPlayerUncheckedCreateWithoutStateInput> | PokerPlayerCreateWithoutStateInput[] | PokerPlayerUncheckedCreateWithoutStateInput[]
    connectOrCreate?: PokerPlayerCreateOrConnectWithoutStateInput | PokerPlayerCreateOrConnectWithoutStateInput[]
    upsert?: PokerPlayerUpsertWithWhereUniqueWithoutStateInput | PokerPlayerUpsertWithWhereUniqueWithoutStateInput[]
    createMany?: PokerPlayerCreateManyStateInputEnvelope
    set?: PokerPlayerWhereUniqueInput | PokerPlayerWhereUniqueInput[]
    disconnect?: PokerPlayerWhereUniqueInput | PokerPlayerWhereUniqueInput[]
    delete?: PokerPlayerWhereUniqueInput | PokerPlayerWhereUniqueInput[]
    connect?: PokerPlayerWhereUniqueInput | PokerPlayerWhereUniqueInput[]
    update?: PokerPlayerUpdateWithWhereUniqueWithoutStateInput | PokerPlayerUpdateWithWhereUniqueWithoutStateInput[]
    updateMany?: PokerPlayerUpdateManyWithWhereWithoutStateInput | PokerPlayerUpdateManyWithWhereWithoutStateInput[]
    deleteMany?: PokerPlayerScalarWhereInput | PokerPlayerScalarWhereInput[]
  }

  export type PokerPlayerUncheckedUpdateManyWithoutStateNestedInput = {
    create?: XOR<PokerPlayerCreateWithoutStateInput, PokerPlayerUncheckedCreateWithoutStateInput> | PokerPlayerCreateWithoutStateInput[] | PokerPlayerUncheckedCreateWithoutStateInput[]
    connectOrCreate?: PokerPlayerCreateOrConnectWithoutStateInput | PokerPlayerCreateOrConnectWithoutStateInput[]
    upsert?: PokerPlayerUpsertWithWhereUniqueWithoutStateInput | PokerPlayerUpsertWithWhereUniqueWithoutStateInput[]
    createMany?: PokerPlayerCreateManyStateInputEnvelope
    set?: PokerPlayerWhereUniqueInput | PokerPlayerWhereUniqueInput[]
    disconnect?: PokerPlayerWhereUniqueInput | PokerPlayerWhereUniqueInput[]
    delete?: PokerPlayerWhereUniqueInput | PokerPlayerWhereUniqueInput[]
    connect?: PokerPlayerWhereUniqueInput | PokerPlayerWhereUniqueInput[]
    update?: PokerPlayerUpdateWithWhereUniqueWithoutStateInput | PokerPlayerUpdateWithWhereUniqueWithoutStateInput[]
    updateMany?: PokerPlayerUpdateManyWithWhereWithoutStateInput | PokerPlayerUpdateManyWithWhereWithoutStateInput[]
    deleteMany?: PokerPlayerScalarWhereInput | PokerPlayerScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPumpkinPlayerInput = {
    create?: XOR<UserCreateWithoutPumpkinPlayerInput, UserUncheckedCreateWithoutPumpkinPlayerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPumpkinPlayerInput
    connect?: UserWhereUniqueInput
  }

  export type PumpkinStatsCreateNestedManyWithoutPlayerInput = {
    create?: XOR<PumpkinStatsCreateWithoutPlayerInput, PumpkinStatsUncheckedCreateWithoutPlayerInput> | PumpkinStatsCreateWithoutPlayerInput[] | PumpkinStatsUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PumpkinStatsCreateOrConnectWithoutPlayerInput | PumpkinStatsCreateOrConnectWithoutPlayerInput[]
    createMany?: PumpkinStatsCreateManyPlayerInputEnvelope
    connect?: PumpkinStatsWhereUniqueInput | PumpkinStatsWhereUniqueInput[]
  }

  export type PumpkinStatsUncheckedCreateNestedManyWithoutPlayerInput = {
    create?: XOR<PumpkinStatsCreateWithoutPlayerInput, PumpkinStatsUncheckedCreateWithoutPlayerInput> | PumpkinStatsCreateWithoutPlayerInput[] | PumpkinStatsUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PumpkinStatsCreateOrConnectWithoutPlayerInput | PumpkinStatsCreateOrConnectWithoutPlayerInput[]
    createMany?: PumpkinStatsCreateManyPlayerInputEnvelope
    connect?: PumpkinStatsWhereUniqueInput | PumpkinStatsWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPumpkinPlayerNestedInput = {
    create?: XOR<UserCreateWithoutPumpkinPlayerInput, UserUncheckedCreateWithoutPumpkinPlayerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPumpkinPlayerInput
    upsert?: UserUpsertWithoutPumpkinPlayerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPumpkinPlayerInput, UserUpdateWithoutPumpkinPlayerInput>, UserUncheckedUpdateWithoutPumpkinPlayerInput>
  }

  export type PumpkinStatsUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<PumpkinStatsCreateWithoutPlayerInput, PumpkinStatsUncheckedCreateWithoutPlayerInput> | PumpkinStatsCreateWithoutPlayerInput[] | PumpkinStatsUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PumpkinStatsCreateOrConnectWithoutPlayerInput | PumpkinStatsCreateOrConnectWithoutPlayerInput[]
    upsert?: PumpkinStatsUpsertWithWhereUniqueWithoutPlayerInput | PumpkinStatsUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: PumpkinStatsCreateManyPlayerInputEnvelope
    set?: PumpkinStatsWhereUniqueInput | PumpkinStatsWhereUniqueInput[]
    disconnect?: PumpkinStatsWhereUniqueInput | PumpkinStatsWhereUniqueInput[]
    delete?: PumpkinStatsWhereUniqueInput | PumpkinStatsWhereUniqueInput[]
    connect?: PumpkinStatsWhereUniqueInput | PumpkinStatsWhereUniqueInput[]
    update?: PumpkinStatsUpdateWithWhereUniqueWithoutPlayerInput | PumpkinStatsUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: PumpkinStatsUpdateManyWithWhereWithoutPlayerInput | PumpkinStatsUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: PumpkinStatsScalarWhereInput | PumpkinStatsScalarWhereInput[]
  }

  export type PumpkinStatsUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<PumpkinStatsCreateWithoutPlayerInput, PumpkinStatsUncheckedCreateWithoutPlayerInput> | PumpkinStatsCreateWithoutPlayerInput[] | PumpkinStatsUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PumpkinStatsCreateOrConnectWithoutPlayerInput | PumpkinStatsCreateOrConnectWithoutPlayerInput[]
    upsert?: PumpkinStatsUpsertWithWhereUniqueWithoutPlayerInput | PumpkinStatsUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: PumpkinStatsCreateManyPlayerInputEnvelope
    set?: PumpkinStatsWhereUniqueInput | PumpkinStatsWhereUniqueInput[]
    disconnect?: PumpkinStatsWhereUniqueInput | PumpkinStatsWhereUniqueInput[]
    delete?: PumpkinStatsWhereUniqueInput | PumpkinStatsWhereUniqueInput[]
    connect?: PumpkinStatsWhereUniqueInput | PumpkinStatsWhereUniqueInput[]
    update?: PumpkinStatsUpdateWithWhereUniqueWithoutPlayerInput | PumpkinStatsUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: PumpkinStatsUpdateManyWithWhereWithoutPlayerInput | PumpkinStatsUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: PumpkinStatsScalarWhereInput | PumpkinStatsScalarWhereInput[]
  }

  export type PumpkinPlayerCreateNestedOneWithoutStatsInput = {
    create?: XOR<PumpkinPlayerCreateWithoutStatsInput, PumpkinPlayerUncheckedCreateWithoutStatsInput>
    connectOrCreate?: PumpkinPlayerCreateOrConnectWithoutStatsInput
    connect?: PumpkinPlayerWhereUniqueInput
  }

  export type PumpkinPlayerUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<PumpkinPlayerCreateWithoutStatsInput, PumpkinPlayerUncheckedCreateWithoutStatsInput>
    connectOrCreate?: PumpkinPlayerCreateOrConnectWithoutStatsInput
    upsert?: PumpkinPlayerUpsertWithoutStatsInput
    connect?: PumpkinPlayerWhereUniqueInput
    update?: XOR<XOR<PumpkinPlayerUpdateToOneWithWhereWithoutStatsInput, PumpkinPlayerUpdateWithoutStatsInput>, PumpkinPlayerUncheckedUpdateWithoutStatsInput>
  }

  export type PumpkinStringsCreatetgChatIdsInput = {
    set: string[]
  }

  export type PumpkinStringsCreatehelloInput = {
    set: string[]
  }

  export type PumpkinStringsCreatenotEnoughPlayersInput = {
    set: string[]
  }

  export type PumpkinStringsCreateearlyWinnerInput = {
    set: string[]
  }

  export type PumpkinStringsCreatenewWinner1Input = {
    set: string[]
  }

  export type PumpkinStringsCreatenewWinner2Input = {
    set: string[]
  }

  export type PumpkinStringsCreatenewWinner3Input = {
    set: string[]
  }

  export type PumpkinStringsCreatenewWinner4Input = {
    set: string[]
  }

  export type PumpkinStringsCreatenewWinnerNewYearInput = {
    set: string[]
  }

  export type PumpkinStringsCreatepumpkinOfYearInput = {
    set: string[]
  }

  export type PumpkinStringsCreatereplyForWinnerInput = {
    set: string[]
  }

  export type PumpkinStringsCreatestatsTitleAllTimeInput = {
    set: string[]
  }

  export type PumpkinStringsCreatestatsTitleYearInput = {
    set: string[]
  }

  export type PumpkinStringsCreatestatsPlayerInput = {
    set: string[]
  }

  export type PumpkinStringsCreatestatsTotalPlayersInput = {
    set: string[]
  }

  export type PumpkinStringsUpdatetgChatIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdatehelloInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdatenotEnoughPlayersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdateearlyWinnerInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdatenewWinner1Input = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdatenewWinner2Input = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdatenewWinner3Input = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdatenewWinner4Input = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdatenewWinnerNewYearInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdatepumpkinOfYearInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdatereplyForWinnerInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdatestatsTitleAllTimeInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdatestatsTitleYearInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdatestatsPlayerInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PumpkinStringsUpdatestatsTotalPlayersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPOKER_ROUNDFilter<$PrismaModel = never> = {
    equals?: $Enums.POKER_ROUND | EnumPOKER_ROUNDFieldRefInput<$PrismaModel>
    in?: $Enums.POKER_ROUND[] | ListEnumPOKER_ROUNDFieldRefInput<$PrismaModel>
    notIn?: $Enums.POKER_ROUND[] | ListEnumPOKER_ROUNDFieldRefInput<$PrismaModel>
    not?: NestedEnumPOKER_ROUNDFilter<$PrismaModel> | $Enums.POKER_ROUND
  }

  export type NestedEnumPOKER_ROUNDWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.POKER_ROUND | EnumPOKER_ROUNDFieldRefInput<$PrismaModel>
    in?: $Enums.POKER_ROUND[] | ListEnumPOKER_ROUNDFieldRefInput<$PrismaModel>
    notIn?: $Enums.POKER_ROUND[] | ListEnumPOKER_ROUNDFieldRefInput<$PrismaModel>
    not?: NestedEnumPOKER_ROUNDWithAggregatesFilter<$PrismaModel> | $Enums.POKER_ROUND
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPOKER_ROUNDFilter<$PrismaModel>
    _max?: NestedEnumPOKER_ROUNDFilter<$PrismaModel>
  }

  export type PokerPlayerCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: PokerPlayerCreatecardsInput | number[]
    balance: number
    betAmount: number
    hasFolded: boolean
    hasLost: boolean
    hasTurned: boolean
    state: PokerStateCreateNestedOneWithoutPlayersInput
  }

  export type PokerPlayerUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: PokerPlayerCreatecardsInput | number[]
    balance: number
    betAmount: number
    hasFolded: boolean
    hasLost: boolean
    hasTurned: boolean
    stateId: string
  }

  export type PokerPlayerCreateOrConnectWithoutUserInput = {
    where: PokerPlayerWhereUniqueInput
    create: XOR<PokerPlayerCreateWithoutUserInput, PokerPlayerUncheckedCreateWithoutUserInput>
  }

  export type PumpkinPlayerCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgChatId: string
    stats?: PumpkinStatsCreateNestedManyWithoutPlayerInput
  }

  export type PumpkinPlayerUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgChatId: string
    stats?: PumpkinStatsUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PumpkinPlayerCreateOrConnectWithoutUserInput = {
    where: PumpkinPlayerWhereUniqueInput
    create: XOR<PumpkinPlayerCreateWithoutUserInput, PumpkinPlayerUncheckedCreateWithoutUserInput>
  }

  export type PumpkinPlayerCreateManyUserInputEnvelope = {
    data: PumpkinPlayerCreateManyUserInput | PumpkinPlayerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PokerPlayerUpsertWithoutUserInput = {
    update: XOR<PokerPlayerUpdateWithoutUserInput, PokerPlayerUncheckedUpdateWithoutUserInput>
    create: XOR<PokerPlayerCreateWithoutUserInput, PokerPlayerUncheckedCreateWithoutUserInput>
    where?: PokerPlayerWhereInput
  }

  export type PokerPlayerUpdateToOneWithWhereWithoutUserInput = {
    where?: PokerPlayerWhereInput
    data: XOR<PokerPlayerUpdateWithoutUserInput, PokerPlayerUncheckedUpdateWithoutUserInput>
  }

  export type PokerPlayerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: PokerPlayerUpdatecardsInput | number[]
    balance?: IntFieldUpdateOperationsInput | number
    betAmount?: IntFieldUpdateOperationsInput | number
    hasFolded?: BoolFieldUpdateOperationsInput | boolean
    hasLost?: BoolFieldUpdateOperationsInput | boolean
    hasTurned?: BoolFieldUpdateOperationsInput | boolean
    state?: PokerStateUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type PokerPlayerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: PokerPlayerUpdatecardsInput | number[]
    balance?: IntFieldUpdateOperationsInput | number
    betAmount?: IntFieldUpdateOperationsInput | number
    hasFolded?: BoolFieldUpdateOperationsInput | boolean
    hasLost?: BoolFieldUpdateOperationsInput | boolean
    hasTurned?: BoolFieldUpdateOperationsInput | boolean
    stateId?: StringFieldUpdateOperationsInput | string
  }

  export type PumpkinPlayerUpsertWithWhereUniqueWithoutUserInput = {
    where: PumpkinPlayerWhereUniqueInput
    update: XOR<PumpkinPlayerUpdateWithoutUserInput, PumpkinPlayerUncheckedUpdateWithoutUserInput>
    create: XOR<PumpkinPlayerCreateWithoutUserInput, PumpkinPlayerUncheckedCreateWithoutUserInput>
  }

  export type PumpkinPlayerUpdateWithWhereUniqueWithoutUserInput = {
    where: PumpkinPlayerWhereUniqueInput
    data: XOR<PumpkinPlayerUpdateWithoutUserInput, PumpkinPlayerUncheckedUpdateWithoutUserInput>
  }

  export type PumpkinPlayerUpdateManyWithWhereWithoutUserInput = {
    where: PumpkinPlayerScalarWhereInput
    data: XOR<PumpkinPlayerUpdateManyMutationInput, PumpkinPlayerUncheckedUpdateManyWithoutUserInput>
  }

  export type PumpkinPlayerScalarWhereInput = {
    AND?: PumpkinPlayerScalarWhereInput | PumpkinPlayerScalarWhereInput[]
    OR?: PumpkinPlayerScalarWhereInput[]
    NOT?: PumpkinPlayerScalarWhereInput | PumpkinPlayerScalarWhereInput[]
    id?: StringFilter<"PumpkinPlayer"> | string
    createdAt?: DateTimeFilter<"PumpkinPlayer"> | Date | string
    updatedAt?: DateTimeFilter<"PumpkinPlayer"> | Date | string
    tgChatId?: StringFilter<"PumpkinPlayer"> | string
    userId?: StringFilter<"PumpkinPlayer"> | string
  }

  export type UserCreateWithoutPokerPlayerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgUserId: string
    firstName: string
    lastName?: string | null
    username?: string | null
    pumpkinPlayer?: PumpkinPlayerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPokerPlayerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgUserId: string
    firstName: string
    lastName?: string | null
    username?: string | null
    pumpkinPlayer?: PumpkinPlayerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPokerPlayerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPokerPlayerInput, UserUncheckedCreateWithoutPokerPlayerInput>
  }

  export type PokerStateCreateWithoutPlayersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgChatId: string
    cards?: PokerStateCreatecardsInput | number[]
    round: $Enums.POKER_ROUND
    dealsCount: number
    dealerIndex: number
    currentPlayerIndex: number
  }

  export type PokerStateUncheckedCreateWithoutPlayersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgChatId: string
    cards?: PokerStateCreatecardsInput | number[]
    round: $Enums.POKER_ROUND
    dealsCount: number
    dealerIndex: number
    currentPlayerIndex: number
  }

  export type PokerStateCreateOrConnectWithoutPlayersInput = {
    where: PokerStateWhereUniqueInput
    create: XOR<PokerStateCreateWithoutPlayersInput, PokerStateUncheckedCreateWithoutPlayersInput>
  }

  export type UserUpsertWithoutPokerPlayerInput = {
    update: XOR<UserUpdateWithoutPokerPlayerInput, UserUncheckedUpdateWithoutPokerPlayerInput>
    create: XOR<UserCreateWithoutPokerPlayerInput, UserUncheckedCreateWithoutPokerPlayerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPokerPlayerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPokerPlayerInput, UserUncheckedUpdateWithoutPokerPlayerInput>
  }

  export type UserUpdateWithoutPokerPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    pumpkinPlayer?: PumpkinPlayerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPokerPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    pumpkinPlayer?: PumpkinPlayerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PokerStateUpsertWithoutPlayersInput = {
    update: XOR<PokerStateUpdateWithoutPlayersInput, PokerStateUncheckedUpdateWithoutPlayersInput>
    create: XOR<PokerStateCreateWithoutPlayersInput, PokerStateUncheckedCreateWithoutPlayersInput>
    where?: PokerStateWhereInput
  }

  export type PokerStateUpdateToOneWithWhereWithoutPlayersInput = {
    where?: PokerStateWhereInput
    data: XOR<PokerStateUpdateWithoutPlayersInput, PokerStateUncheckedUpdateWithoutPlayersInput>
  }

  export type PokerStateUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
    cards?: PokerStateUpdatecardsInput | number[]
    round?: EnumPOKER_ROUNDFieldUpdateOperationsInput | $Enums.POKER_ROUND
    dealsCount?: IntFieldUpdateOperationsInput | number
    dealerIndex?: IntFieldUpdateOperationsInput | number
    currentPlayerIndex?: IntFieldUpdateOperationsInput | number
  }

  export type PokerStateUncheckedUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
    cards?: PokerStateUpdatecardsInput | number[]
    round?: EnumPOKER_ROUNDFieldUpdateOperationsInput | $Enums.POKER_ROUND
    dealsCount?: IntFieldUpdateOperationsInput | number
    dealerIndex?: IntFieldUpdateOperationsInput | number
    currentPlayerIndex?: IntFieldUpdateOperationsInput | number
  }

  export type PokerPlayerCreateWithoutStateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: PokerPlayerCreatecardsInput | number[]
    balance: number
    betAmount: number
    hasFolded: boolean
    hasLost: boolean
    hasTurned: boolean
    user: UserCreateNestedOneWithoutPokerPlayerInput
  }

  export type PokerPlayerUncheckedCreateWithoutStateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: PokerPlayerCreatecardsInput | number[]
    balance: number
    betAmount: number
    hasFolded: boolean
    hasLost: boolean
    hasTurned: boolean
    userId: string
  }

  export type PokerPlayerCreateOrConnectWithoutStateInput = {
    where: PokerPlayerWhereUniqueInput
    create: XOR<PokerPlayerCreateWithoutStateInput, PokerPlayerUncheckedCreateWithoutStateInput>
  }

  export type PokerPlayerCreateManyStateInputEnvelope = {
    data: PokerPlayerCreateManyStateInput | PokerPlayerCreateManyStateInput[]
    skipDuplicates?: boolean
  }

  export type PokerPlayerUpsertWithWhereUniqueWithoutStateInput = {
    where: PokerPlayerWhereUniqueInput
    update: XOR<PokerPlayerUpdateWithoutStateInput, PokerPlayerUncheckedUpdateWithoutStateInput>
    create: XOR<PokerPlayerCreateWithoutStateInput, PokerPlayerUncheckedCreateWithoutStateInput>
  }

  export type PokerPlayerUpdateWithWhereUniqueWithoutStateInput = {
    where: PokerPlayerWhereUniqueInput
    data: XOR<PokerPlayerUpdateWithoutStateInput, PokerPlayerUncheckedUpdateWithoutStateInput>
  }

  export type PokerPlayerUpdateManyWithWhereWithoutStateInput = {
    where: PokerPlayerScalarWhereInput
    data: XOR<PokerPlayerUpdateManyMutationInput, PokerPlayerUncheckedUpdateManyWithoutStateInput>
  }

  export type PokerPlayerScalarWhereInput = {
    AND?: PokerPlayerScalarWhereInput | PokerPlayerScalarWhereInput[]
    OR?: PokerPlayerScalarWhereInput[]
    NOT?: PokerPlayerScalarWhereInput | PokerPlayerScalarWhereInput[]
    id?: StringFilter<"PokerPlayer"> | string
    createdAt?: DateTimeFilter<"PokerPlayer"> | Date | string
    updatedAt?: DateTimeFilter<"PokerPlayer"> | Date | string
    cards?: IntNullableListFilter<"PokerPlayer">
    balance?: IntFilter<"PokerPlayer"> | number
    betAmount?: IntFilter<"PokerPlayer"> | number
    hasFolded?: BoolFilter<"PokerPlayer"> | boolean
    hasLost?: BoolFilter<"PokerPlayer"> | boolean
    hasTurned?: BoolFilter<"PokerPlayer"> | boolean
    userId?: StringFilter<"PokerPlayer"> | string
    stateId?: StringFilter<"PokerPlayer"> | string
  }

  export type UserCreateWithoutPumpkinPlayerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgUserId: string
    firstName: string
    lastName?: string | null
    username?: string | null
    pokerPlayer?: PokerPlayerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPumpkinPlayerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgUserId: string
    firstName: string
    lastName?: string | null
    username?: string | null
    pokerPlayer?: PokerPlayerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPumpkinPlayerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPumpkinPlayerInput, UserUncheckedCreateWithoutPumpkinPlayerInput>
  }

  export type PumpkinStatsCreateWithoutPlayerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
  }

  export type PumpkinStatsUncheckedCreateWithoutPlayerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
  }

  export type PumpkinStatsCreateOrConnectWithoutPlayerInput = {
    where: PumpkinStatsWhereUniqueInput
    create: XOR<PumpkinStatsCreateWithoutPlayerInput, PumpkinStatsUncheckedCreateWithoutPlayerInput>
  }

  export type PumpkinStatsCreateManyPlayerInputEnvelope = {
    data: PumpkinStatsCreateManyPlayerInput | PumpkinStatsCreateManyPlayerInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPumpkinPlayerInput = {
    update: XOR<UserUpdateWithoutPumpkinPlayerInput, UserUncheckedUpdateWithoutPumpkinPlayerInput>
    create: XOR<UserCreateWithoutPumpkinPlayerInput, UserUncheckedCreateWithoutPumpkinPlayerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPumpkinPlayerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPumpkinPlayerInput, UserUncheckedUpdateWithoutPumpkinPlayerInput>
  }

  export type UserUpdateWithoutPumpkinPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    pokerPlayer?: PokerPlayerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPumpkinPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    pokerPlayer?: PokerPlayerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PumpkinStatsUpsertWithWhereUniqueWithoutPlayerInput = {
    where: PumpkinStatsWhereUniqueInput
    update: XOR<PumpkinStatsUpdateWithoutPlayerInput, PumpkinStatsUncheckedUpdateWithoutPlayerInput>
    create: XOR<PumpkinStatsCreateWithoutPlayerInput, PumpkinStatsUncheckedCreateWithoutPlayerInput>
  }

  export type PumpkinStatsUpdateWithWhereUniqueWithoutPlayerInput = {
    where: PumpkinStatsWhereUniqueInput
    data: XOR<PumpkinStatsUpdateWithoutPlayerInput, PumpkinStatsUncheckedUpdateWithoutPlayerInput>
  }

  export type PumpkinStatsUpdateManyWithWhereWithoutPlayerInput = {
    where: PumpkinStatsScalarWhereInput
    data: XOR<PumpkinStatsUpdateManyMutationInput, PumpkinStatsUncheckedUpdateManyWithoutPlayerInput>
  }

  export type PumpkinStatsScalarWhereInput = {
    AND?: PumpkinStatsScalarWhereInput | PumpkinStatsScalarWhereInput[]
    OR?: PumpkinStatsScalarWhereInput[]
    NOT?: PumpkinStatsScalarWhereInput | PumpkinStatsScalarWhereInput[]
    id?: StringFilter<"PumpkinStats"> | string
    createdAt?: DateTimeFilter<"PumpkinStats"> | Date | string
    updatedAt?: DateTimeFilter<"PumpkinStats"> | Date | string
    date?: DateTimeFilter<"PumpkinStats"> | Date | string
    playerId?: StringFilter<"PumpkinStats"> | string
  }

  export type PumpkinPlayerCreateWithoutStatsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgChatId: string
    user: UserCreateNestedOneWithoutPumpkinPlayerInput
  }

  export type PumpkinPlayerUncheckedCreateWithoutStatsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgChatId: string
    userId: string
  }

  export type PumpkinPlayerCreateOrConnectWithoutStatsInput = {
    where: PumpkinPlayerWhereUniqueInput
    create: XOR<PumpkinPlayerCreateWithoutStatsInput, PumpkinPlayerUncheckedCreateWithoutStatsInput>
  }

  export type PumpkinPlayerUpsertWithoutStatsInput = {
    update: XOR<PumpkinPlayerUpdateWithoutStatsInput, PumpkinPlayerUncheckedUpdateWithoutStatsInput>
    create: XOR<PumpkinPlayerCreateWithoutStatsInput, PumpkinPlayerUncheckedCreateWithoutStatsInput>
    where?: PumpkinPlayerWhereInput
  }

  export type PumpkinPlayerUpdateToOneWithWhereWithoutStatsInput = {
    where?: PumpkinPlayerWhereInput
    data: XOR<PumpkinPlayerUpdateWithoutStatsInput, PumpkinPlayerUncheckedUpdateWithoutStatsInput>
  }

  export type PumpkinPlayerUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPumpkinPlayerNestedInput
  }

  export type PumpkinPlayerUncheckedUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PumpkinPlayerCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tgChatId: string
  }

  export type PumpkinPlayerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
    stats?: PumpkinStatsUpdateManyWithoutPlayerNestedInput
  }

  export type PumpkinPlayerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
    stats?: PumpkinStatsUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type PumpkinPlayerUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tgChatId?: StringFieldUpdateOperationsInput | string
  }

  export type PokerPlayerCreateManyStateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: PokerPlayerCreatecardsInput | number[]
    balance: number
    betAmount: number
    hasFolded: boolean
    hasLost: boolean
    hasTurned: boolean
    userId: string
  }

  export type PokerPlayerUpdateWithoutStateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: PokerPlayerUpdatecardsInput | number[]
    balance?: IntFieldUpdateOperationsInput | number
    betAmount?: IntFieldUpdateOperationsInput | number
    hasFolded?: BoolFieldUpdateOperationsInput | boolean
    hasLost?: BoolFieldUpdateOperationsInput | boolean
    hasTurned?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutPokerPlayerNestedInput
  }

  export type PokerPlayerUncheckedUpdateWithoutStateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: PokerPlayerUpdatecardsInput | number[]
    balance?: IntFieldUpdateOperationsInput | number
    betAmount?: IntFieldUpdateOperationsInput | number
    hasFolded?: BoolFieldUpdateOperationsInput | boolean
    hasLost?: BoolFieldUpdateOperationsInput | boolean
    hasTurned?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PokerPlayerUncheckedUpdateManyWithoutStateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: PokerPlayerUpdatecardsInput | number[]
    balance?: IntFieldUpdateOperationsInput | number
    betAmount?: IntFieldUpdateOperationsInput | number
    hasFolded?: BoolFieldUpdateOperationsInput | boolean
    hasLost?: BoolFieldUpdateOperationsInput | boolean
    hasTurned?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PumpkinStatsCreateManyPlayerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
  }

  export type PumpkinStatsUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PumpkinStatsUncheckedUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PumpkinStatsUncheckedUpdateManyWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}