<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\DetailProcess;
use App\Task;
use App\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Http\Requests\StoreTaskForm;
use App\Http\Requests\UpdateTaskForm;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::with(['status', 'category', 'adminUser', 'workUser'])->get();

        return response()->json([
            'tasks' => $tasks,
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
    public function store(StoreTaskForm $request)
    {
        $task = Task::create([
            'name' => $request->get('task_name'),
            'description' => $request->get('description'),
            'work_user' => $request->get('work_user'),
            'priority' => $request->get('priority'),
            'category_id' => $request->get('category'),
            'status_id' => $request->get('status'),
            'deadline' => $request->get('deadline'),
            'admin_user' => $request->get('admin_user'),
        ]);

        return response()->json([
            'task' => $task,
        ]);
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
    public function update(UpdateTaskForm $request)
    {
        $userFromToken = auth()->user();   //送られてきたトークンからユーザー情報を取得

        $id = $request->get('id');
        $task = Task::find($id);

        //管理者権限ユーザー または タスク登録者 または タスク担当者 の時に処理を走らせる
        if ($userFromToken->admin == true || $userFromToken->id == $task->admin_user || $userFromToken->id == $task->work_user) {

            $task->name = $request->get('task_name');
            $task->description = $request->get('description');
            $task->work_user = $request->get('work_user');
            $task->priority = $request->get('priority');
            $task->category_id = $request->get('category');
            $task->status_id = $request->get('status');
            $task->deadline = $request->get('deadline');
            $task->progress = $request->get('progress');
            $task->man_hours = $request->get('man_hours');

            $task->save();

            return response()->json([
                'task' => $task,
            ]);
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
        $task = Task::find($id);

        //管理者権限ユーザー または タスク登録者 の時に処理を走らせる
        if ($userFromToken->admin == true || $userFromToken->id == $task->admin_user) {

            $task->delete();
        }
    }
}
