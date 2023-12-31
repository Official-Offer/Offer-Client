import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import Link from "next/link";
import { EngineType } from "embla-carousel/components/Engine";
import useEmblaCarousel, {
  EmblaOptionsType,
  EmblaCarouselType,
} from "embla-carousel-react";
import { Card as AntdCard, Button } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

type CarouselProps = {
  slides: any[];
  slideSize?: "quarter" | "full";
  showDots?: boolean;
  slidesLimit?: number;
  slidesToScroll?: number;
  isAsync?: boolean;
  isFetching?: boolean;
  loadNextFunc?: () => void;
  hasNextSlide?: boolean;
  viewMoreUrl?: string; // This is the URL for the button at the end
  noMargin?: boolean;
};

// Instead of add hasMoreToLoad, just change is Async to false once you reaced the bottom
// This will still work since rerendering the parent component with certain props would only rerender the children components with certain props

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  slideSize,
  showDots,
  slidesLimit,
  slidesToScroll,
  isAsync,
  isFetching,
  loadNextFunc,
  hasNextSlide,
  viewMoreUrl,
  noMargin,
}) => {
  // Use ref so that it won't change during rerenders -> Less variables rerendered
  const slideRef = useRef<number>(1);
  const scrollListenerRef = useRef<() => void>(() => undefined);
  const listenForScrollRef = useRef<boolean>(true);
  const hasMoreToLoadRef = useRef<boolean>(
    slideRef.current < (slidesLimit ?? 0),
  );
  const [hasMoreToLoad, setHasMoreToLoad] = useState<boolean>(
    slideRef.current < (slidesLimit ?? 0) && hasNextSlide,
  );
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    skipSnaps: true,
    slidesToScroll: slidesToScroll ?? 1,
    watchSlides: (emblaApi) => {
      // Keep the scroll position when loading more
      const reloadEmbla = (): void => {
        emblaApi.reInit();
      };

      const reloadAfterPointerUp = (): void => {
        emblaApi.off("pointerUp", reloadAfterPointerUp);
        reloadEmbla();
      };

      const engine = emblaApi.internalEngine();

      if (hasMoreToLoadRef.current && engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get());
        engine.scrollBounds.toggleActive(boundsActive);
        emblaApi.on("pointerUp", reloadAfterPointerUp);
      } else {
        reloadEmbla();
      }
    },
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState<boolean>(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (isAsync && loadNextFunc) loadNextFunc();
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  const onScroll = useCallback(
    (emblaApi: EmblaCarouselType) => {
      // if (!listenForScrollRef.current) return;
      setLoadingMore((loadingMore) => {
        // console.log(loadNextFunc)
        const lastSlide = emblaApi.slideNodes().length - 1;
        const lastSlideInView = emblaApi.slidesInView().includes(lastSlide);
        const loadMore = !loadingMore && lastSlideInView;
        if (loadMore) {
          listenForScrollRef.current = false;
          // let currentSlideNum = slideRef.current;
          if (loadNextFunc) loadNextFunc();
          // slideRef.current = currentSlideNum + 1;
        }

        return loadingMore || lastSlideInView;
      });
    },
    [],
  );

  const addScrollListener = useCallback(
    (emblaApi: EmblaCarouselType) => {
      scrollListenerRef.current = () => onScroll(emblaApi);
      emblaApi.on("scroll", scrollListenerRef.current);
    },
    [onScroll],
  );

  useEffect(() => {
    if (isAsync && emblaApi && slides.length > 1)
      emblaApi.scrollTo(slides.length - 1);
  }, [slides]);

  useEffect(() => {
    if (!emblaApi) return;
    addScrollListener(emblaApi);

    const onResize = () => emblaApi.reInit();
    window.addEventListener("resize", onResize);
    emblaApi.on("destroy", () =>
      window.removeEventListener("resize", onResize),
    );
  }, [emblaApi, addScrollListener]);

  useEffect(() => {
    setHasMoreToLoad(
      slideRef.current < (slidesLimit ?? 0) && hasNextSlide
    );
    setLoadingMore(false);
  }, [isFetching]);

  useEffect(() => {
    hasMoreToLoadRef.current = hasMoreToLoad;
  }, [hasMoreToLoad]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="embla">
      <div
        className={
          "embla__viewport" + (noMargin ? " embla__viewport--no-margin" : "")
        }
        ref={emblaRef}
      >
        <div
          className={
            "embla__container" +
            (noMargin ? " embla__container--no-margin" : "")
          }
        >
          {slides.map((item, index) => (
            <div
              className={`embla__slide ${
                slideSize ? `embla__slide--${slideSize}` : ""
              }`}
              key={index}
            >
              {item}
            </div>
          ))}
          {isAsync && hasMoreToLoad ? (
            <div className="embla__scroll-extender">
              <LoadingOutlined />
            </div>
          ) : viewMoreUrl ? (
            <div className="embla__scroll-extender">
              <Link href={viewMoreUrl}>
                <Button
                  // className={
                  //   "embla__next" + (showDots ? " embla__next--with-dots" : "") + (noMargin ? " embla__next--no-margin" : "")
                  // }
                  icon={<ArrowRightOutlined />}
                  onClick={scrollNext}
                  // disabled={nextBtnDisabled}
                  // type="primary"
                  shape="circle"
                />
                <div className="embla__scroll-extender-text">Xem thêm</div>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <div className="embla__buttons">
        <Button
          className={
            "embla__prev" +
            (showDots ? " embla__prev--with-dots" : "") +
            (noMargin ? " embla__prev--no-margin" : "")
          }
          icon={<ArrowLeftOutlined />}
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          type="primary"
          shape="circle"
        />
        <Button
          className={
            "embla__next" +
            (showDots ? " embla__next--with-dots" : "") +
            (noMargin ? " embla__next--no-margin" : "")
          }
          icon={<ArrowRightOutlined />}
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          type="primary"
          shape="circle"
        />
      </div>
      {showDots && (
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : "",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};
