
interface Props{
    url_image: string | undefined,
    type?: string
}
export function RowImage({url_image , type = ''}: Props){
    const classname = FactoryStyle(type)

    return (<div className={`image ${classname}`}>
        <img src={url_image}/>
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