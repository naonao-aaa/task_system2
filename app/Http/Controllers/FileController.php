<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\File;
use App\Services\DetailProcess;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $taskId = $request->get('taskId');

        $files = File::where('task_id', $taskId)->orderBy('updated_at', 'asc')->get();

        return response()->json([
            'files' => $files,
        ]);
    }

    public function upload(Request $request)
    {
        DetailProcess::fileStore($request, null, null);   //ファイル保存処理

    }

    public function uploadFromComment(Request $request)
    {
        $data = $request->all();
        $commentId = $data['commentId'];
        $fromComment = $data['fromComment'];

        DetailProcess::fileStore($request, $commentId, $fromComment);   //ファイル保存処理

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
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
