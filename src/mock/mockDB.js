export const db = {
  clients: [
    {
      id: '213',
      name: 'Adam Kowalsk',
      email: 'asdf@sdf.no',
      status: 'Pending',
      comments: '',
    },
    {
      id: '34r',
      name: 'Jane Doe',
      email: 'assdfdf@sdf.no',
      status: 'Active',
      comments:
        'Test ødflsk jdsflk jdsf lkjdfsøl kjdf lkj dflkjsdløkfjasdlfkjsdflk jd fslkj sølkj',
      sessions: [
        {
          title: 'Lower back training',
          id: 'h8fa',
        },
        { title: 'Everyday exercices', id: 'p98uawf' },
      ],
    },
    {
      id: '23rfv',
      name: 'Pia Kekkajarvi',
      email: 'asdf@sdf.no',
      status: 'Active',
      comments:
        'Test ødflsk jdsflk jdsf lkjdfsøl kjdf lkj dflkjsdløkfjasdlfkjsdflk jd fslkj sølkj',
      sessions: [
        {
          title: 'Lower back training',
          id: 'h8fa',
        },
        { title: 'Everyday exercices', id: 'p98uawf' },
      ],
    },
  ],
  sessions: [
    {
      title: 'Lower back training',
      id: 'h8fa',
      description:
        'This training session you should do 3 times a week as discussed during our last appoitment.',
      exercises: [
        {
          id: 'oisuf98',

          title: 'Bridge  - begginer level',
          description:
            'Do 3 series of 15 repetitions. Hold 10 sec in the posision.',
        },
        {
          id: 'ouh8',
          title: 'Knee-to-chest stretches',
        },
        {
          id: 'ihf8',
          title: 'Lower back stretches',
          description:
            'Do 3 series of 15 repetitions. Hold 10 sec in the posision.',
        },
      ],
    },
    { title: 'Everyday exercices', id: 'p98uawf' },
  ],
};
