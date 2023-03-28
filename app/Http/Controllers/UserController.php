<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Requests\StoreUserForm;
use App\Http\Requests\UpdateUserForm;
use App\Http\Requests\UpdatePasswordForm;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::get();

        return response()->json([
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserForm $request)
    {
        $userFromToken = auth()->user();   //送られてきたトークンからユーザー情報を取得

        if ($userFromToken->admin == true) {

            $user = User::create([
                'name' => $request->get('user_name'),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password')),
                'api_token' => Str::random(60),
            ]);

            $accessToken = $user->createToken('authToken')->accessToken;

            return response()->json([
                'user' => $user,
                'access_token' => $accessToken
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserForm $request, User $user)
    {
        $userFromToken = auth()->user();   //送られてきたトークンからユーザー情報を取得

        if ($userFromToken->admin == true || ($userFromToken->guest == false && $userFromToken->id == $user->id)) {   //(管理者権限) または (ゲストじゃなくて、かつ トークンから取得したユーザーIDとパラメーターから取得したユーザーIDが同じ時)

            $user->name = $request->get('user_name');
            $user->email = $request->get('email');

            $user->save();
        }
    }

    public function passwordUpdate(UpdatePasswordForm $request)
    {
        $userFromToken = auth()->user();   //送られてきたトークンからユーザー情報を取得

        $id = $request->get('id');

        if ($userFromToken->admin == true || ($userFromToken->guest == false && $userFromToken->id == $id)) {  //(管理者権限) または (ゲストじゃなくて、かつ トークンから取得したユーザーIDとaxios.postで設定されたユーザーIDが同じ時)
            $user = User::find($id);

            $user->password = Hash::make($request->get('password'));

            $user->save();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        $userFromToken = auth()->user();   //送られてきたトークンからユーザー情報を取得

        $id = request('id');

        if ($userFromToken->admin == true || ($userFromToken->guest == false && $userFromToken->id == $id)) {  //(管理者権限) または (ゲストじゃなくて、かつ トークンから取得したユーザーIDとaxios.postで設定されたユーザーIDが同じ時)

            $category = User::find($id);

            $category->delete();
        }
    }
}
