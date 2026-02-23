/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Device, DeviceDetails } from './modules/types';

export async function getData(url: string) {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error);
  }
}

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getData(`${import.meta.env.BASE_URL}api/products.json`)
      .then(data => {
        setDevices(data ?? []);
      })
      .catch(error => {
        console.error(error?.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { devices, loading };
}

export function useDevicesFamily(
  namespaceId: string,
  productCategory: string,
): { devices: DeviceDetails[] | null; loading: boolean } {
  const [devices, setDevices] = useState<DeviceDetails[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!namespaceId) {
      setLoading(false);

      return;
    }

    setLoading(true);
    async function loadDevices() {
      const details = await getData(
        `${import.meta.env.BASE_URL}api/${productCategory}.json`,
      );
      const list = details
        ? [...details].filter(d => d.namespaceId === namespaceId)
        : [];

      setDevices(list.length ? list : null);
      setLoading(false);
    }

    loadDevices();
  }, [namespaceId, productCategory]);

  return { devices, loading };
}

export function useDevice(productId?: string) {
  const [device, setDevice] = useState<DeviceDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setLoading(false);

      return;
    }

    setLoading(true);
    async function loadDevice() {
      try {
        const products = await getData(
          `${import.meta.env.BASE_URL}api/products.json`,
        ); // 👈 prepend base
        const product = products?.find(
          (p: { itemId: string }) => p.itemId === productId,
        );

        if (!product) {
          setDevice(null);
          setLoading(false);

          return;
        }

        const details = await getData(
          `${import.meta.env.BASE_URL}api/${product.category}.json`,
        );
        const found = details?.find((d: DeviceDetails) => d.id === productId);

        setDevice(found ?? null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDevice();
  }, [productId]);

  return { device, loading };
}

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(savedValue);
    } catch (error) {
      localStorage.removeItem(key);

      return defaultValue;
    }
  });

  function save(newValue: T) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, save] as const;
}
