//#pragma GCC optimize "trapv"
#pragma GCC optimize("Ofast")
#pragma GCC optimize("O3", "unroll-loops")
#pragma GCC target("avx,avx2,fma")
#include<bits/stdc++.h>
#define ll long long int
#define fab(a,b,i) for(int i=a;i<b;i++)
#define pb push_back
#define db double
#define mp make_pair
#define endl "\n"
#define f first
#define se second
#define all(x) x.begin(),x.end()
#define MOD 1000000007
#define vll vector<ll>
#define vi vector<int>
#define pii pair<int,int>
#define pll pair<ll,ll>
#define quick ios_base::sync_with_stdio(false);cin.tie(NULL);cout.tie(NULL)

using namespace std;

ll add(ll x, ll y) {ll res = x + y; return (res >= MOD ? res - MOD : res);}
ll mul(ll x, ll y) {ll res = x * y; return (res >= MOD ? res % MOD : res);}
ll sub(ll x, ll y) {ll res = x - y; return (res < 0 ? res + MOD : res);}
ll power(ll x, ll y) {ll res = 1; x %= MOD; while (y) {if (y & 1)res = mul(res, x); y >>= 1; x = mul(x, x);} return res;}
ll mod_inv(ll x) {return power(x, MOD - 2);}
ll lcm(ll x, ll y) { ll res = x / __gcd(x, y); return (res * y);}

bool comp(const vector<int> &a, const vector<int> &b)
{
	return (a[0] > b[0]);
}
int main()
{	quick;
	mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
#ifndef ONLINE_JUDGE
	freopen("stationNames.txt", "r", stdin);
	freopen("output.txt", "w", stdout);
#endif

	string s;
	vector<string> a;
	while (getline(cin, s))
	{	//cin.getline(s);
		a.pb(s);
	}

	int n = a.size();

	ofstream f1("data.csv");

	vector<string> week = {"MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"};

	vector<string> time = {"10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00"};

	vector<string> weather = { "Rainy", "ThunderStorm", "Cool", "Sunny"};

	vector<string> high, low, average;

	fab(0, n, i)
	{
		int x = uniform_int_distribution<int>(0, 2)(rng);

		if (x == 0)
			high.pb(a[i]);
		else if (x == 1)
			low.pb(a[i]);
		else
			average.pb(a[i]);
	}

	// cerr << "high:" << endl;
	// for (auto i : high)
	// 	cerr << i << " ";
	// cerr << endl;
	// cerr << "low:" << endl;
	// for (auto i : low)
	// 	cerr << i << " ";
	// cerr << endl;
	// cerr << "avg:" << endl;
	// for (auto i : average)
	// 	cerr << i << " ";
	// cerr << endl;




	cout << "Station Name" << "," << "Day" << "," << "Time" << "," << "Population" << "," << "Weather" << endl;


	fab(0, n, i)
	{
		string s = a[i];
		int pri = -1;
		if (count(all(high), s))
			pri = 0;
		else if (count(all(low), s))
			pri = 1;
		else
			pri = 2;

		vector<vector<int> > vals;






		fab(0,7, i)
		{
			vector<int> v;
			int l = 0, r = 2e3;
			if (pri == 0)
			{
				if (i < 2)
				{
					r = 1e3 + 500 ;
					l = 700;
				}
				else if (i < 5)
				{
					r = 1e3;
					l = 400;

				}
				else
				{
					r = 700;
					l = 200;
				}

			}
			else if (pri == 1)
			{
				if (i < 2)
				{
					r = 200 ;
					l = 50;
				}
				else if (i < 5)
				{
					r = 100;
					l = 40;

				}
				else
				{
					r = 70;
					l = 20;
				}

			}
			else
			{
				if (i < 2)
				{
					r =  500 ;
					l = 100;
				}
				else if (i < 5)
				{
					r = 300;
					l = 80;

				}
				else
				{
					r = 100;
					l = 50;
				}
			}
			//cerr << "station:" << s << " " << i << " " << l << " " << r << endl;
			fab(0, 10, j)
			{	int x = uniform_int_distribution<int>(l, r)(rng);
				v.pb(x);
			}
			sort(all(v));
			//cerr << "v:" << endl;


			vector<int> op = v;
			op[9] = v[8];
			op[0] = v[9];
			op[1] = v[7];
			op[8] = v[6];
			op[2] = v[2];
			op[3] = v[1];
			op[4] = v[0];
			op[5] = v[3];
			op[6] = v[4];
			op[7] = v[5];
			// for (auto ii : op)
			// 	cerr << ii << " ";
			// cerr << endl;

			vals.pb(op);






		}
		sort(all(vals), comp);
		// for (auto j : vals)
		// {
		// 	for (auto p : j)
		// 		cerr << p << " ";
		// 	cerr << endl;
		// }
		fab(0, 70, k)
		{
			fab(0, 7, p)
			{

				int pos = uniform_int_distribution<int>(0, 3)(rng);
				fab(0, 11, j)
				{

					int variation = uniform_int_distribution<int>(0, 100)(rng);

					if (pri == 0)
					{
						if (i < 2)
						{
							variation = uniform_int_distribution<int>(200, 300)(rng);
							if (variation > 250)
								pos = uniform_int_distribution<int>(0, 1)(rng);

						}
						else if (i < 5)
						{
							variation = uniform_int_distribution<int>(100, 200)(rng);
							// if (variation > 160)
							// 	pos = uniform_int_distribution<int>(0, 2)(rng);


						}
						else
						{
							variation = uniform_int_distribution<int>(40, 100)(rng);


						}
					}
					else if (pri == 1)
					{
						if (i < 2)
						{
							variation = uniform_int_distribution<int>(25, 40)(rng);
							if (variation > 33)
								pos = uniform_int_distribution<int>(0, 1)(rng);

						}
						else if (i < 5)
						{
							variation = uniform_int_distribution<int>(10, 30)(rng);
							// if (variation > 25)
							// 	pos = uniform_int_distribution<int>(0, 2)(rng);


						}
						else
						{
							variation = uniform_int_distribution<int>(10, 20)(rng);

						}

					}
					else
					{
						if (i < 2)
						{
							variation = uniform_int_distribution<int>(80, 200)(rng);
							if (variation > 140)
								pos = uniform_int_distribution<int>(0, 1)(rng);

						}
						else if (i < 5)
						{
							variation = uniform_int_distribution<int>(40, 80)(rng);
							// if (variation > 65)
							// 	pos = uniform_int_distribution<int>(0, 2)(rng);


						}
						else
						{
							variation = uniform_int_distribution<int>(30, 50)(rng);

						}
					}
					int decide = uniform_int_distribution<int> (0, 2)(rng);
					if (decide == 0)
						variation *= -1;
					//cerr << ""


					if (variation > 0 )
					{
						pos = uniform_int_distribution<int>(2, 3)(rng);
					}


					int value = vals[p][j] + variation;
					if (pri == 0)
					{
						value = max(uniform_int_distribution<int>(100, 110)(rng), value);
						value = min(value, uniform_int_distribution<int>(1600, 1630)(rng));

					}
					else if (pri == 1)
					{
						value = max(value, uniform_int_distribution<int>(15, 20)(rng));
						value = min(value, uniform_int_distribution<int>(250, 265)(rng));
					}
					else
					{
						value = max(value, uniform_int_distribution<int>(50, 58)(rng));
						value = min(value, uniform_int_distribution<int>(550, 570)(rng));
					}
					cout << s << "," << week[p] << "," << time[j] << "," << value << "," << weather[pos] << endl;
				}

			}

		}





	}






	cerr << "time taken : " << (float)clock() / CLOCKS_PER_SEC << " secs" << endl;
	return 0;
}
