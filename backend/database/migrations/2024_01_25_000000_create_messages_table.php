<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->ulid('id');
            $table->longText('message');
            $table->string('sender');
            $table->string('model')->nullable();
            $table->ulid('conversation_id');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('conversation_id', 'messages_conversations_id_fk')
                ->references('id')
                ->on('conversations')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
