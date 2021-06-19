/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as S from './styles';

type Props = PropsWithChildren<{
  showCounter?: boolean;
  showFullWidth?: boolean;
}>;

type MyHTMLDivElement = {
  msRequestFullscreen: () => Promise<void>;
  webkitRequestFullscreen: () => Promise<void>;
} & HTMLDivElement;

const SimpleSlider = ({ children, showCounter, showFullWidth }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<MyHTMLDivElement>(null);

  const totalChildren = useMemo(
    () => React.Children.count(children),
    [children],
  );

  const isFullscreenEnable = useCallback(() => {
    return (
      document.fullscreenEnabled ||
      (document as any).mozFullScreenEnabled ||
      (document as any).documentElement.webkitRequestFullScreen ||
      (document as any).webkitFullscreenEnabled
    );
  }, []);

  const toggleFullWidth = useCallback(async () => {
    if (!wrapperRef.current) {
      return;
    }

    const isFullscreenShow =
      document.fullscreenElement || (document as any).webkitFullscreenElement;

    if (isFullscreenShow) {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any)?.webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any)?.msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } else if (wrapperRef.current?.requestFullscreen) {
      await wrapperRef.current.requestFullscreen();
    } else if (wrapperRef.current?.webkitRequestFullscreen) {
      await wrapperRef.current.webkitRequestFullscreen();
    } else if (wrapperRef.current?.msRequestFullscreen) {
      await wrapperRef.current.msRequestFullscreen();
    }
  }, []);

  const handleNext = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      setActiveIndex(oldIndex => {
        const newIndex = oldIndex + 1;

        if (newIndex >= totalChildren) {
          return 0;
        }

        return newIndex;
      });
    },
    [totalChildren],
  );

  const handlePrev = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      setActiveIndex(oldIndex => {
        const newIndex = oldIndex - 1;

        if (newIndex < 0) {
          return totalChildren - 1;
        }

        return newIndex;
      });
    },
    [totalChildren],
  );

  const renderSlides = useCallback(() => {
    return React.Children.map(children, (child: ReactElement, index) => {
      if (activeIndex === index) {
        return React.cloneElement(child, {
          style: { position: 'inherit' },
          hidden: activeIndex !== index,
          'aria-hidden': activeIndex !== index,
        });
      }

      return null;
    });
  }, [activeIndex, children]);

  return (
    <S.Wrapper ref={wrapperRef} id="slider-wrapper">
      {showCounter && (
        <S.Count>
          {activeIndex + 1}/{totalChildren}
        </S.Count>
      )}

      {showFullWidth && isFullscreenEnable() && (
        <S.FullWidth onClick={toggleFullWidth}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20.885"
            height="20.885"
            viewBox="0 0 20.885 20.885"
          >
            <g
              id="Caminho_2926"
              transform="translate(-430 -994)"
              fill="#ffffff"
            >
              <path
                d="M449.884,1013.885H442.8v-2.36h4.722V1006.8h2.36v7.081h0Zm-18.883,0h0V1006.8h2.36v4.722h4.722v2.36Zm16.523-11.8v-4.722H442.8V995h7.082v7.081Zm-16.524,0V995h7.082v2.36H433.36v4.722Z"
                stroke="none"
              />
              <path
                d="M 449.8847961425781 1013.885131835938 L 449.8847961425781 1013.884033203125 L 449.8847961425781 1006.803100585938 L 447.5245056152344 1006.803100585938 L 447.5245056152344 1011.52490234375 L 442.8027648925781 1011.52490234375 L 442.8027648925781 1013.885131835938 L 449.8837585449219 1013.885131835938 L 449.8847961425781 1013.885131835938 M 438.0821228027344 1013.885131835938 L 438.0821228027344 1011.52490234375 L 433.3604431152344 1011.52490234375 L 433.3604431152344 1006.803100585938 L 431.0001220703125 1006.803100585938 L 431.0001220703125 1013.884033203125 L 431.0001220703125 1013.885131835938 L 431.0011596679688 1013.885131835938 L 438.0821228027344 1013.885131835938 M 449.8847961425781 1002.08251953125 L 449.8847961425781 995.00146484375 L 449.8847961425781 995.00048828125 L 449.8837585449219 995.00048828125 L 442.8027648925781 995.00048828125 L 442.8027648925781 997.36083984375 L 447.5245056152344 997.36083984375 L 447.5245056152344 1002.08251953125 L 449.8847961425781 1002.08251953125 M 433.3604431152344 1002.08251953125 L 433.3604431152344 997.36083984375 L 438.0821228027344 997.36083984375 L 438.0821228027344 995.00048828125 L 431.0011596679688 995.00048828125 L 431.0001220703125 995.00048828125 L 431.0001220703125 995.00146484375 L 431.0001220703125 1002.08251953125 L 433.3604431152344 1002.08251953125 M 449.8847961425781 1014.885131835938 L 449.8837585449219 1014.885131835938 L 442.8027648925781 1014.885131835938 L 441.8027648925781 1014.885131835938 L 441.8027648925781 1013.885131835938 L 441.8027648925781 1011.52490234375 L 441.8027648925781 1010.52490234375 L 442.8027648925781 1010.52490234375 L 446.5245056152344 1010.52490234375 L 446.5245056152344 1006.803100585938 L 446.5245056152344 1005.803100585938 L 447.5245056152344 1005.803100585938 L 449.8847961425781 1005.803100585938 L 450.8847961425781 1005.803100585938 L 450.8847961425781 1006.803100585938 L 450.8847961425781 1013.884033203125 L 450.8847961425781 1014.884033203125 L 449.8847961425781 1014.885131835938 Z M 439.0821228027344 1014.885131835938 L 438.0821228027344 1014.885131835938 L 431.0011596679688 1014.885131835938 L 430.0011596679688 1014.885131835938 L 430.0001220703125 1013.885131835938 L 430.0001220703125 1006.803100585938 L 430.0001220703125 1005.803100585938 L 431.0001220703125 1005.803100585938 L 433.3604431152344 1005.803100585938 L 434.3604431152344 1005.803100585938 L 434.3604431152344 1006.803100585938 L 434.3604431152344 1010.52490234375 L 438.0821228027344 1010.52490234375 L 439.0821228027344 1010.52490234375 L 439.0821228027344 1011.52490234375 L 439.0821228027344 1013.885131835938 L 439.0821228027344 1014.885131835938 Z M 450.8847961425781 1003.08251953125 L 449.8847961425781 1003.08251953125 L 447.5245056152344 1003.08251953125 L 446.5245056152344 1003.08251953125 L 446.5245056152344 1002.08251953125 L 446.5245056152344 998.36083984375 L 442.8027648925781 998.36083984375 L 441.8027648925781 998.36083984375 L 441.8027648925781 997.36083984375 L 441.8027648925781 995.00048828125 L 441.8027648925781 994.00048828125 L 442.8027648925781 994.00048828125 L 449.8837585449219 994.00048828125 L 450.8837585449219 994.00048828125 L 450.8847961425781 995.00048828125 L 450.8847961425781 1002.08251953125 L 450.8847961425781 1003.08251953125 Z M 434.3604431152344 1003.08251953125 L 433.3604431152344 1003.08251953125 L 431.0001220703125 1003.08251953125 L 430.0001220703125 1003.08251953125 L 430.0001220703125 1002.08251953125 L 430.0001220703125 995.00146484375 L 430.0001220703125 994.00146484375 L 431.0001220703125 994.00048828125 L 438.0821228027344 994.00048828125 L 439.0821228027344 994.00048828125 L 439.0821228027344 995.00048828125 L 439.0821228027344 997.36083984375 L 439.0821228027344 998.36083984375 L 438.0821228027344 998.36083984375 L 434.3604431152344 998.36083984375 L 434.3604431152344 1002.08251953125 L 434.3604431152344 1003.08251953125 Z"
                stroke="none"
                fill="rgba(0,0,0,0.1)"
              />
            </g>
          </svg>
        </S.FullWidth>
      )}

      {totalChildren > 0 && (
        <>
          <S.ArrowLeft onClick={handlePrev} />
          <S.ArrowRight onClick={handleNext} />
        </>
      )}

      <S.Content>
        {renderSlides()}

        {/* Exemple */}

        {/* <SimpleSlider>
         <picture>
         <img src="" alt="" />
         </picture>
         </SimpleSlider> */}
      </S.Content>
    </S.Wrapper>
  );
};

export default React.memo(SimpleSlider);
