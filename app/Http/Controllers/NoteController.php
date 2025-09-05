<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class NoteController extends Controller
{
    //
    public function index(): Response
    {
        return Inertia::render('notes', [
            'notes' => Auth::user()->notes()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'body_md' => 'required',
            'title' => 'required'
        ]);

        try {
            Note::create([
                'body_md' => $request->input('body_md'),
                'title' => $request->input('title'),
                'user_id' => Auth::user()->id
            ]);   
        } catch (\Throwable $th) {
            Log::error("Failed to create note", [
                'message' => $th->getMessage(),
            ]);
            return response("Failed to create note", 422);
        }

        return back()->with('success', 'Operation completed successfully');
    }
}
