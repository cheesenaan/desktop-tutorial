
<Carousel
    layout="3UP"
    gutter="24px"
    peek="standard"
    surface="light"
    paginationInset="12px"
    pagination={{
      kind: 'lowContrast',
      hideBorder: true,
      floating: true,
    }}
    paginationDisplay="persistent"
    aspectRatio="16:9"
    data={[
    
      {
        title: {
          size: 'titleLarge',
          primitive: 'h1',
          children: `Up to 30% off gifts`,
        },
        backgroundColor: 'white',
        
        showBorder: true,
        onClick: () => {},
      },
      {
        title: {
          size: 'titleLarge',
          primitive: 'h1',
          children: 'Get 5G Home Internet starting at $25/mo.',
        },
        backgroundColor: 'black',
        
        onClick: () => {},
      },
      {
        title: {
          size: 'titleLarge',
          primitive: 'h1',
          children: 'Get Unlimited starting at $35/mo.',
        },
        backgroundColor: 'white',
        showBorder: true,
        onClick: () => {},
      },
      {
        title: {
          size: 'titleLarge',
          primitive: 'h1',
          children: 'Get 35% off accessories when you buy 4 or more',
        },
        backgroundColor: 'gray',
        onClick: () => {},
      },
    ]}
    renderItem={(props) => <data {...props} width="100%" />}
  />
