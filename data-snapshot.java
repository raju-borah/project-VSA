public class FirebaseService
{
	private final String FIREBASE_URL = "https://rxjava-android.firebaseio.com/data";

	private static FirebaseService mInstance;

	private Firebase mFirebaseData;
	private ValueEventListener mDataListener;

	private  FirebaseService(){}

	public static  FirebaseService getInstance()
	{
		if(mInstance == null)
		{
			mInstance = new FirebaseService();
		}

		return mInstance;
	}


	public  void getData()
	{
		mFirebaseData = new Firebase(FIREBASE_URL);

		mDataListener = mFirebaseData.addValueEventListener(new ValueEventListener()
		{
			@Override
			public  void onDataChange(DataSnapshot dataSnapshot)
			{
				FirebaseDataEvent event = new FirebaseDataEvent();
				event.setFirebaseDataString(dataSnapshot.toString());
				RxCustomBus.getInstance().publish(event);
			}


			@Override
			public  void onCancelled(FirebaseError firebaseError)
			{

			}
		});
	}

	public  void unregisterDataObserver()
	{
		if(mDataListener != null)
		{
			mFirebaseData.removeEventListener(mDataListener);
		}
	}
}