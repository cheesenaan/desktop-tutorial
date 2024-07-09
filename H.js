export default class App extends Component {
  render() {
    return (
      <Fragment>
        <VDSManager/>


      

        <TileContainer
          padding='12px'
          aspectRatio='16:9'
          width='100%'
          height='725px'
          backgroundColor="black"
          >
            
            <TitleLockup
              surface="dark"
              textAlignment='center'
              data={{
                eyebrow: {
                  size: 'titleMedium',
                  children: 'Get Started ... Learn More ...  About me ...  Support',
                  bold: 'true',
                },
                title: {
                  size: 'title2XLarge',
                  children: 'Resume 2x the speed.',
                },
                subtitle: {
                  size: 'titleSmall',
                  children: 'Unlock your career potential.',
                  
                },
              }}
            />

        </TileContainer>;


        <ModalFooter
          buttonData={{
            primary: {
              children: 'Get Started',
              onClick: () => alert('Clicked Get Started'),
            },
            close: {
              children: 'Learn More',
              onClick: () => alert('Clicked Learn More'),
            },
          }}
        />


      </Fragment>
      
    );
  }
}
