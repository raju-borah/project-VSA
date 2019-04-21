    <!-- </div> -->
   <div class="upload__container">
      <!-- upload videos section -->
      <div class="upload__videos--card u-center-text">
        <a href="#headSection" class="btn--close">&times;</a>

        <!-- heading -->
        <h1 class="font-medium u-margin-bottom-small">Upload Videos</h1>
        <!-- upload button -->
        <input type="file" id="upload-file" accept="video/*" hidden="hidden" @change="change">
        <!-- text to display the file name to be uploaded -->
        <span id="custom-text">No file Choosen yet !</span>
        <button type="button" class="btn btn--upload u-margin-bottom-medium" id="choose-video">
          CHOOSE A
          FILE
        </button>

        <!-- for title -->
        <input
          type="text"
          class="form__input--upload form__input--upload--1"
          id="upload-title"
          placeholder="Title"
          v-model="validTile"
        >
        <span v-if="errMsgTitle" style="color:red">{{errMsgTitle}}</span>
        <!-- for description -->
        <textarea
          rows="2"
          cols="30"
          class="form__input--upload form__input--upload--1"
          id="upload-description"
          placeholder="Description"
          v-model="description"
        ></textarea>
        <!-- for selecting the category -->
        <select
          id="video-category"
          class="form__input--upload form__input--upload--2"
          v-model="category"
        >
          <!-- <option value="Select Category" selected>Select Category</option> -->
          <option>Learning</option>
          <option>Events</option>
          <option>Club activities</option>
        </select>

        <button class="btn btn--upload" type="submit" id="upload-video" @click="upload">Upload</button>
      </div>
    </div> 



    .custom-text {
  font-size: 2rem;
  /* width: 24rem; */
  margin: 1rem;
  position: relative;
  /* left: 30%; */
  /* display: block; */
  text-overflow: ellipsis;
  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow: hidden; }


  transition: width 0.5s ease;