using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskManagerBackend.Api.Models;


[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private static readonly List<TaskItem> _tasks = new List<TaskItem>();

    // GET api/tasks - list all tasks
    [HttpGet]
    public ActionResult<List<TaskItem>> Get()
    {
        return _tasks;
    }

    // POST api/tasks - create new task
    [HttpPost]
    public ActionResult<TaskItem> Post([FromBody] TaskItem newTask)
    {
        newTask.Id = Guid.NewGuid();
        newTask.IsCompleted = false;
        _tasks.Add(newTask);
        return CreatedAtAction(nameof(Get), new { id = newTask.Id }, newTask);
    }

    // PUT api/tasks/{id} - update task (toggle completion or description)
    [HttpPut("{id}")]
    public IActionResult Put(Guid id, [FromBody] TaskItem updatedTask)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return NotFound();

        task.Description = updatedTask.Description;
        task.IsCompleted = updatedTask.IsCompleted;
        return NoContent();
    }

    // DELETE api/tasks/{id} - delete task
    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return NotFound();

        _tasks.Remove(task);
        return NoContent();
    }
}
