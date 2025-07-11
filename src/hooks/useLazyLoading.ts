import { useState, useEffect, useCallback } from "react";

interface UseLazyLoadingOptions {
  initialCount?: number;
  incrementCount?: number;
  threshold?: number;
}

export const useLazyLoading = <T>(
  items: T[],
  options: UseLazyLoadingOptions = {}
) => {
  const { initialCount = 20, incrementCount = 10, threshold = 1000 } = options;

  const [displayCount, setDisplayCount] = useState(
    Math.min(initialCount, items.length)
  );
  const [isLoading, setIsLoading] = useState(false);

  // アイテムが変更されたら表示カウントをリセット
  useEffect(() => {
    setDisplayCount(Math.min(initialCount, items.length));
  }, [items, initialCount]);

  const loadMore = useCallback(() => {
    if (isLoading || displayCount >= items.length) return;

    setIsLoading(true);

    // 少し遅延を入れてローディング感を出す
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + incrementCount, items.length));
      setIsLoading(false);
    }, 100);
  }, [displayCount, items.length, incrementCount, isLoading]);

  // スクロールイベントでの自動読み込み
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.offsetHeight - threshold &&
        !isLoading &&
        displayCount < items.length
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, isLoading, displayCount, items.length, threshold]);

  return {
    displayedItems: items.slice(0, displayCount),
    displayCount,
    hasMore: displayCount < items.length,
    isLoading,
    loadMore,
  };
};
