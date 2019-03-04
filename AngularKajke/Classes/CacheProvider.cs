using Microsoft.Extensions.Caching.Memory;
using System;

namespace AngularKajke.Classes
{
  public abstract class CacheProvider
  {
    private readonly IMemoryCache _cache;
    private readonly double _defaultCacheTime;

    public CacheProvider(IMemoryCache cache, double defaultCacheTime)
    {
      _cache = cache;
      _defaultCacheTime = defaultCacheTime;
    }

    /// <summary>
    /// Spróboj załadowac wartosc z pamieci podrecznej
    /// </summary>
    /// <typeparam name="T">typ obiektu</typeparam>
    /// <param name="key">klucz obiektu</param>
    /// <returns></returns>
    public virtual T LoadCachedItem<T>(object key)
       where T : class
    {
      if (_cache.TryGetValue<T>(key, out T item)) return item;
      else return null;
    }

    /// <summary>
    /// Załaduj wybrany obiekt do pamieci podrecznej i zwróc go
    /// </summary>
    /// <typeparam name="T">typ obiektu</typeparam>
    /// <param name="key">klucz obiektu</param>
    /// <param name="func">akcja ktora zwroci obiekt</param>
    /// <returns></returns>
    public virtual T SetCacheItem<T>(object key, Func<T> func)
       where T : class
    {
      var item = func();
      if (item != null) _cache.Set<T>(key, item, DateTimeOffset.Now.AddMinutes(_defaultCacheTime));
      return item;
    }

    /// <summary>
    /// Załaduj wybrany obiekt do pamieci podrecznej i zwróc go
    /// </summary>
    /// <typeparam name="T">typ obiektu</typeparam>
    /// <param name="key">klucz obiektu</param>
    /// <param name="value">obiekt do cache/param>
    /// <returns></returns>
    public virtual void SetCacheItem<T>(object key, T value)
       where T : class
    {
      _cache.Set<T>(key, value, DateTimeOffset.Now.AddMinutes(_defaultCacheTime));
    }

    /// <summary>
    /// Załaduj wybrany obiekt do pamieci podrecznej i zwróc go
    /// </summary>
    /// <typeparam name="T">typ obiektu</typeparam>
    /// <param name="key">klucz obiektu</param>
    /// <param name="func">akcja ktora zwroci obiekt</param>
    /// <param name="cacheTime">Czas przechowywania obiektu</param>
    /// <returns></returns>
    public virtual T SetCacheItem<T>(object key, Func<T> func, double cacheTime)
      where T : class
    {
      var item = func();
      if (item != null) _cache.Set<T>(key, item, DateTimeOffset.Now.AddMinutes(cacheTime));
      return item;
    }

    public virtual void SetCacheItem<T>(object key, T value, double cacheTime)
       where T : class
    {
      _cache.Set<T>(key, value, DateTimeOffset.Now.AddMinutes(cacheTime));
    }

    /// <summary>
    /// Przestań przechowywać obiekty w pamieci
    /// </summary>
    /// <param name="keys">klucze obiektów</param>
    public virtual void RemoveCacheItems(params object[] keys)
    {
      foreach (var item in keys)
      {
        _cache.Remove(item);
      }
    }
  }
}
