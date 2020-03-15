function generateNewThreadForm() {
  return (`
    <form>
      <div class="form-group">
        <label for="room-id" class="col-md-2">Room ID</label>
        <div class="col-md-10">
          <input type="text" class="form-control" id="room-id"  placeholder="Enter room id">
        </div>
      </div>
      <div class="form-group">
        <label for="room-name" class="col-md-2">Room Name</label>
        <div class="col-md-10">
          <input type="text" class="form-control" id="room-name" placeholder="Enter room name">
        </div>
      </div>
      <div class="form-group">
        <label for="thread-local-topic-id" class="col-md-2">Thread local topic id</label>
        <div class="col-md-10">
          <input type="text" class="form-control" id="thread-local-topic-id" placeholder="Enter thread id">
        </div>
      </div>
      <div class="form-group">
        <label for="thread-name" class="col-md-2">Thread name</label>
        <div class="col-md-10">
          <input type="text" class="form-control" id="thread-name" placeholder="Enter thread name">
        </div>
      </div>
      <button type="submit" id="new-thread-btn-submit" class="btn btn-primary col-md-12">Save</button>
    </form>
    `
  );
}
