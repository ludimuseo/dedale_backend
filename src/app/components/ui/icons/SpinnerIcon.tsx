import type { SvgProps } from '@/types'

const SpinnerIcon = ({ ...props }: SvgProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
        {...props}
        className={`fill-current ${props.className ?? ''}`}>
        <path d="M 11 0 C 10.74 0 10.483969 0.10196875 10.292969 0.29296875 L 7.2929688 3.2929688 C 6.9019688 3.6839688 6.9019687 4.3170313 7.2929688 4.7070312 L 10.292969 7.7070312 C 10.578969 7.9930312 11.007812 8.0778281 11.382812 7.9238281 C 11.756813 7.7688281 12 7.405 12 7 L 12 5 C 15.877484 5 19 8.1225161 19 12 C 19 13.025799 18.774981 13.99479 18.376953 14.876953 A 1.0001 1.0001 0 1 0 20.199219 15.699219 C 20.707191 14.573382 21 13.320201 21 12 C 21 7.0414839 16.958516 3 12 3 L 12 1 C 12 0.596 11.756812 0.23117187 11.382812 0.076171875 C 11.258813 0.025171875 11.129 0 11 0 z M 4.7265625 7.6992188 A 1.0001 1.0001 0 0 0 3.8007812 8.3007812 C 3.2928092 9.426618 3 10.679799 3 12 C 3 16.958516 7.0414839 21 12 21 L 12 23 C 12 23.404 12.243188 23.768828 12.617188 23.923828 C 12.741187 23.974828 12.871 24 13 24 C 13.26 24 13.516031 23.898031 13.707031 23.707031 L 16.707031 20.707031 C 17.098031 20.316031 17.098031 19.683969 16.707031 19.292969 L 13.707031 16.292969 C 13.421031 16.006969 12.992188 15.922172 12.617188 16.076172 C 12.243187 16.231172 12 16.596 12 17 L 12 19 C 8.1225161 19 5 15.877484 5 12 C 5 10.974201 5.225019 10.00521 5.6230469 9.1230469 A 1.0001 1.0001 0 0 0 4.7265625 7.6992188 z" />
      </svg>
    </>
  )
}

export { SpinnerIcon }
