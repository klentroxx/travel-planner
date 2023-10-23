import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export abstract class AbstractStorageService<T> {
  /**
   * Unique identifier prefix for application's localStorage key-value pairs
   */
  private readonly prefix = `__${environment.appAlias}-`;
  /**
   * Name of the key of individual localStorage services.
   */
  protected abstract readonly keyName: string;

  protected constructor(
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  /**
   * LocalStorage reference for checking if current platform is browser.
   * This reference is an error handling method for SSR.
   */
  private get ref(): Storage | null {
    return isPlatformBrowser(this.platformId) ? window.localStorage : null
  }

  /**
   * Same as localStorage's length property
   */
  public get length(): number {
    return this.ref?.length ?? 0
  }

  /**
   * Same as localStorage's getItem(key: string) function
   *
   * @returns
   */
  public getItem(): T | null {
    const item = this.ref?.getItem(this.prefix + this.keyName)

    return item ? JSON.parse(item) : null
  }

  /**
   * Same as localStorage's setItem(key: string, value: string) function
   *
   * @param value
   */
  public setItem(value: T): void {
    this.ref?.setItem(this.prefix + this.keyName, JSON.stringify(value))
  }

  /**
   * Same as localStorage's removeItem(key: string) function
   */
  public removeItem(): void {
    this.ref?.removeItem(this.prefix + this.keyName)
  }

  /**
   * Same as localStorage's key(index: number) function
   *
   * @param index
   * @returns
   */
  public key(index: number): string | null {
    return this.ref?.key(index) ?? null
  }

  /**
   * Same as localStorage's clear() function
   */
  public clear(): void {
    this.ref?.clear()
  }
}
