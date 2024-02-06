
interface Props{
    url_image: string | undefined,
    type?: string,
    width?: number,
    height?: number,
    alt?: string
}
export function RowImage({url_image , type = '', width, height, alt}: Props){
    const classname = FactoryStyle(type)

    return (<div className={`image ${classname}`} style={{width, height}}>
        <img src={url_image} alt={alt}/>
    </div>)
}

const FactoryStyle = (variant : string): string => {
    switch (variant) {
      case 'row':
        return 'image--row';
      default:
         return '';
    }
  }