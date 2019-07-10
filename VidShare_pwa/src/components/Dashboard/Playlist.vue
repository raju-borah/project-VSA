<template>
  <div class="dashboardplaylist" id="Playlist">
    <!-- for playlist descrpition and other details -->
    <div>
      <!-- playlist details-->
      <div class="vcard vcard--playlist">
        <!-- the thumbnail position  vcard 1 st part-->
        <div class="vcard--img vcard--img--playlist1">
          <!-- the tag for video  defining the category of video-->
          <h1 class="vcard--tag vcard--tag--playlist">
            <button class="btn btn--front">play all</button>
          </h1>
        </div>
        <!-- the division that contain the information of the video .It is the second part of the vcard -->
        <div class="vcard__info">
          <div class="vcard__info--title">
            <!-- dynamiv title of the video -->
            <span>JavaScript Tutorial.</span>
          </div>
          <!-- timestamp when the video was created -->
          <span class="timestamp font-small">Created on: 15-04-2019</span>
          <button class="u-end-text btn btn--trans">
            <i class="fas fa-list"></i>
          </button>

          <ul class="list--option list--option--plist">
            <li class="list--items list--items--option">
              <a href="/editplaylist.html" class="btnlist font-xsmall">
                Edit title &
                description
              </a>
            </li>
            <li class="list--items list--items--option">
              <a href="/addvideo.html" class="btnlist font-xsmall">
                Add
                video
              </a>
            </li>
            <li class="list--items list--items--option">
              <button class="btnlist btnlist--btn font-xsmall">Delete playlist</button>
            </li>
            <li class="list--items list--items--option">
              <button class="btnlist btnlist--btn font-xsmall">
                Delete all the
                video
              </button>
            </li>
          </ul>
          <br />
          <div class="font-small">
            <i class="fas fa-eye"></i> 12k views
          </div>

          <span style="font-weight: 550;">Description:</span>
          <br />
          <!-- dynamic descrptiob of the video -->
          <span class="vcard__info--des">The series of video will help the viewes to ...</span>
        </div>
      </div>
      <!-- end of vcard -->
    </div>
    <!-- list of video on the playlist  -->
    <ul class="list hauto">
      <!-- playlist video--1 -->
      <li class="list--items">
        <!-- video cards -->
        <div class="vcard gridplaylist gridplaylist--1">
          <!-- the thumbnail position  vcard 1 st part-->
          <div class="vcard--img vcard--img--playlist"></div>
          <!-- the division that contain the information of the video .It is the second part of the vcard -->
          <div class="vcard__info">
            <div class="vcard__info--title">
              <!-- dynamiv title of the video -->
              <span>Fun way to Learn JavaScript.</span>
            </div>
            <!-- timestamp when the video was created -->
            <span class="timestamp font-small">Created on: 15-04-2019</span>
            <button class="u-end-text btn btn--trans">
              <i class="fas fa-list"></i>
            </button>
            <ul class="list list--option">
              <li class="list--items list--items--option">
                <a href="/editvideo.html" class="btnlist font-xsmall">
                  Edit title &
                  description
                </a>
              </li>
              <li class="list--items list--items--option">
                <button class="btnlist btnlist--btn font-xsmall">
                  Delete the
                  video
                </button>
              </li>
              <li class="list--items list--items--option">
                <button class="btnlist btnlist--btn font-xsmall">Remove from playlist</button>
              </li>
            </ul>

            <br />
            <div class="playlist--desc">
              <span style="font-weight: 550;">Description:</span>
              <!-- dynamic descrptiob of the video -->
              <span class="vcard__info--des">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Nihil
                et ad aliquam esse ipsum nemo, optio reiciendis assumenda facere quibusdam.
              </span>
            </div>
          </div>
        </div>
        <!-- end of vcard -->
      </li>

      <!-- playlist video--2 -->
      <li class="list--items">
        <!-- video cards -->
        <div class="vcard gridplaylist gridplaylist--1">
          <!-- the thumbnail position  vcard 1 st part-->
          <div class="vcard--img vcard--img--playlist"></div>
          <!-- the division that contain the information of the video .It is the second part of the vcard -->
          <div class="vcard__info">
            <div class="vcard__info--title">
              <!-- dynamiv title of the video -->
              <span>Fun way to Learn JavaScript.</span>
            </div>
            <!-- timestamp when the video was created -->
            <span class="timestamp font-small">Created on: 15-04-2019</span>
            <button class="u-end-text btn btn--trans">
              <i class="fas fa-list"></i>
            </button>
            <ul class="list list--option">
              <li class="list--items list--items--option">
                <a href="/editvideo.html" class="btnlist font-xsmall">
                  Edit title &
                  description
                </a>
              </li>
              <li class="list--items list--items--option">
                <button class="btnlist btnlist--btn font-xsmall">
                  Delete the
                  video
                </button>
              </li>
              <li class="list--items list--items--option">
                <button class="btnlist btnlist--btn font-xsmall">Remove from playlist</button>
              </li>
            </ul>

            <br />
            <div class="playlist--desc">
              <span style="font-weight: 550;">Description:</span>
              <!-- dynamic descrptiob of the video -->
              <span class="vcard__info--des">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Nihil
                et ad aliquam esse ipsum nemo, optio reiciendis assumenda facere quibusdam.
              </span>
            </div>
          </div>
        </div>
        <!-- end of vcard -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Playlist"
};
</script>
